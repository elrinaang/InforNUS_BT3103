<template>
<body>
  <div class="header text-center">
    <h1>{{this.lodging_name}}</h1>
    <p>
      For more information, please visit their webpage
      <a v-bind:href="selectedLodging.link">here</a>
    </p>
  </div>
  <div class="mt-3">
    <b-card-group deck class="dashboardInfo">
      <b-card border-variant="info" header="Average Travelling Time" align="center">
        <b-card-text>
          <vue-chart type="horizontalBar" :data="this.fillData" :bind="true"></vue-chart>
        </b-card-text>
      </b-card>
      <b-card border-variant="info" header="Good Review" align="center">
        <b-card-text>
          <wordcloud
            :data="this.getGoodReviews"
            nameKey="name"
            valueKey="value"
            :color="myColors"
            :showTooltip="false"
            :rotate="{from: 0, to: 0, numOfOrientation: 1 }"
            :margin="{top: 0, right: 15, bottom: 15, left: 15 }"
            style="height:195px"
          ></wordcloud>
        </b-card-text>
      </b-card>
      <b-card border-variant="info" header="Bad Review" align="center">
        <b-card-text>
          <wordcloud
            :data="this.getBadReviews"
            nameKey="name"
            valueKey="value"
            :color="myColors"
            :showTooltip="false"
            :rotate="{from: 0, to: 0, numOfOrientation: 1 }"
            style="height:195px"
          ></wordcloud>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
  <div class="mt-3">
    <b-card-group deck class="dashboardInfo">
      <b-card border-variant="info" header="Faculty Breakdown" align="center">
        <b-card-text>
          <pie-chart :data="this.getFacultyBreakdown"></pie-chart>
        </b-card-text>
      </b-card>
      <b-card border-variant="info" header="Room Type and Price" align="center">
        <b-card-text>
          <table style="width:100%" class="price-table">
            <tr>
              <th>Items to be paid</th>
              <th>Price</th>
            </tr>
            <tr v-for="row in this.getLodgingInfo2" v-bind:key="row.id">
              <td>{{row.id}}</td>
              <td>{{row.value}}</td>
            </tr>
          </table>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</body>
</template>

<script>
import Vue from "vue";
import VueChartkick from "vue-chartkick";
import Chart from "chart.js";
import db from "@/firebase.js";
// https://github.com/feifang/vue-wordcloud
import wordcloud from "vue-wordcloud";
import VueChart from "vue-chart";

Vue.use(VueChart);
Vue.use(VueChartkick, { adapter: Chart });

export default {
  name: "lodgingDashboard",
  firebase: {
    student_lodging_info: db.ref("student_lodging_info/data"),
    lodging_info: db.ref("lodging_info/data")
  },
  components: {
    wordcloud,
    VueChart
  },

  created() {
    this.lodging_name = this.$route.params.lodging_name;
  },
  data() {
    return {
      // colors for wordcloud
      myColors: ["#1f77b4", "#629fc9", "#94bedb", "#c9e0ef"]
    };
  },
  computed: {
    selectedLodging: function() {
      // filter to match the parameter containing the selected lodging
      let ans = this.lodging_info.filter(
        lodging => lodging.lodging_name == this.lodging_name
      );
      console.log(ans[0]);
      return ans[0];
    },

    getLodgingLink() {
      console.log(this.selectedLodging);
      return this.selectedLodging.link;
    },
    getFacultyBreakdown() {
      let ans = {};
      for (var student of this.student_lodging_info) {
        if (!(student.home_faculty in ans)) {
          ans[student.home_faculty] = 0;
        }
        ans[student.home_faculty] += 1;
      }
      return ans;
    },
    getTravellingTime() {
      let ans = {};
      var test = [];
      var faculties = [
        "School of Business",
        "Engineering",
        "Faculty of Science",
        "Faculty of Arts and Social Sciences",
        "School of Computing"
      ];
      for (var lodging of this.lodging_info) {
        if (
          lodging.lodging_name.toLowerCase() == this.lodging_name.toLowerCase()
        ) {
          for (var fac of faculties) {
            ans[fac] = lodging[fac];
            test.push([fac, lodging[fac]]);
          }
        }
      }
      return test;
    },
    getGoodReviews() {
      var ans = {};
      var defaultWords = [];
      for (var lodging of this.lodging_info) {
        if (
          lodging.lodging_name.toLowerCase() == this.lodging_name.toLowerCase()
        ) {
          for (var goodcomments of lodging.good_reviews) {
            if (!(goodcomments in ans)) {
              ans[goodcomments] = 0;
            }
            ans[goodcomments] += 1;
          }
        }
      }
      for (var comment of Object.keys(ans)) {
        defaultWords.push({ name: comment, value: ans[comment] });
      }
      return defaultWords;
    },
    getBadReviews() {
      var ans = {};
      var defaultWords = [];
      for (var lodging of this.lodging_info) {
        if (
          lodging.lodging_name.toLowerCase() == this.lodging_name.toLowerCase()
        ) {
          for (var badcomments of lodging.bad_reviews) {
            if (!(badcomments in ans)) {
              ans[badcomments] = 0;
            }
            ans[badcomments] += 1;
          }
        }
      }

      for (var comment of Object.keys(ans)) {
        defaultWords.push({ name: comment, value: ans[comment] });
      }

      return defaultWords;
    },
    getLodgingInfo2() {
      var test = [];
      var ans = {};
      for (var lodging of this.lodging_info) {
        if (
          lodging.lodging_name.toLowerCase() == this.lodging_name.toLowerCase()
        ) {
          test.push({
            id: "Double Room with Air Con",
            value: lodging.Type_Of_Rooms.Double_AC
          });
          test.push({
            id: "Double Room without Air Con",
            value: lodging.Type_Of_Rooms.Double_No_AC
          });
          test.push({
            id: "Single Room with Air Con",
            value: lodging.Type_Of_Rooms.Single_AC
          });
          test.push({
            id: "Single Room without Air Con",
            value: lodging.Type_Of_Rooms.Single_No_AC
          });
          test.push({ id: "Meal Plan", value: lodging.meal_plan });
        }
      }
      return test;
    },
    fillData() {
      var info = [];
      var travellingLabels = [
        "School of Business",
        "Engineering",
        "Faculty of Science",
        "Faculty of Arts and Social Sciences",
        "School of Computing"
      ];
      for (var lodging of this.lodging_info) {
        if (
          lodging.lodging_name.toLowerCase() === this.lodging_name.toLowerCase()
        ) {
          for (var fac of travellingLabels) {
            // console.log('added')
            info.push(lodging[fac]);
          }
        }
      }
      var datacollection = {
        labels: travellingLabels,
        datasets: [
          {
            label: "Average Travelling Time",
            backgroundColor: [
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)"
            ],
            borderColor: [
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)"
            ],
            borderWidth: 1,
            data: info
          }
        ]
      };
      return datacollection;
    }
  }
};
</script>

<style scoped>
.header {
  padding-top: 90px;
  padding-bottom: 10px;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #E6E6E6;
}
.lodging_dashboard {
  padding-top: 0px;
}
.dashboardInfo {
  padding-left: 60px;
  padding-right: 60px;
}
</style>