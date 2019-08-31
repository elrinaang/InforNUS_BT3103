<template>
<body class="dashboardbody">
    <div class="header text-center">
    <h1>{{this.course_name}}
      <router-link
              v-bind:to="{name:'courseCareerDashboard', params: {course_name: selectedCourse.course_name}}"
            >
              <b-button variant="outline-primary">Career Info</b-button>
            </router-link>
    </h1>
    <p> For more information, please visit their webpage <a v-bind:href = "selectedCourse.link"> here </a> </p>
  </div>
  <br>
  <b-card-group deck class = "dashboardInfo">
    <b-card border-variant="info" header="Description" align="center">
      <b-card-text>{{selectedCourse.CourseDescription}}</b-card-text>
    </b-card>
    <b-card border-variant = "info">
      <b-row>
        <b-card border-variant="info" header="Indicative Grade Profile" align="center">
          <b-card-text>
            <table class="Grade Profile">
              <thead>
                <tr>
                  <th>Qualification</th>
                  <th>Score (10th/90th Percentile)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value,key) in this.gradeProfile" :key="key">
                  <td>{{key}}</td>
                  <td>{{value}}</td>
                </tr>
              </tbody>
            </table>
          </b-card-text>
        </b-card>
      </b-row>
      <br/>
      <br/>
      <b-row>
        <b-card border-variant="info" header="Cohort Breakdown" align="center">
          <b-card-text>
            <pie-chart :data="this.distributionInfo"></pie-chart>
          </b-card-text>
        </b-card>
      </b-row>
    </b-card>
  </b-card-group>
  <br>
  <b-card-group deck class = "dashboardInfo">
    <b-card border-variant="info" header="Student Ratings" align="center">
      <b-card-text>
        <b-list-group flush>
          <b-list-group-item>Helpfulness of NUS</b-list-group-item>
          <star-rating
            class="stars"
            :rating="selectedCourse.course_helpfulness"
            :read-only="true"
            :border-width="4"
            border-color="#d8d8d8"
            :rounded-corners="true"
            :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
          ></star-rating>
          <b-list-group-item>Job Preparedness</b-list-group-item>
          <star-rating
            class="stars"
            :rating="selectedCourse.job_prep"
            :read-only="true"
            :border-width="4"
            border-color="#d8d8d8"
            :rounded-corners="true"
            :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
          ></star-rating>
          <b-list-group-item>Overall Satisfaction</b-list-group-item>
          <star-rating
            class="stars"
            :rating="selectedCourse.overall_satisfaction"
            :read-only="true"
            :border-width="4"
            border-color="#d8d8d8"
            :rounded-corners="true"
            :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
          ></star-rating>
        </b-list-group>
      </b-card-text>
    </b-card>

    <b-card border-variant="info" align="center">
      <b-row>
        <b-col>
          <b-card border-variant="info" header="School Fees" align="center">
            <b-card-text>
              <h3>{{selectedCourse.school_fees}}</h3>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <br>
      <b-row>
        <b-col>
          <b-card border-variant="info" header="Distribution of Honours" align="center">
            <b-card-text>
              <table id="graduateTable">
                <thead>
                  <tr>
                    <th style="width:25%;">Honors</th>
                    <th style="width:25%;">Percentage(%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Highest Distinction</td>
                    <td>{{ selectedCourse.first_class }}</td>
                  </tr>
                  <tr>
                    <td>Distinction</td>
                    <td>{{ selectedCourse.second_class }}</td>
                  </tr>
                </tbody>
              </table>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-card>
  </b-card-group>
</body>
</template> 



<script>
import db from "../firebase.js";
import VueChartKick from "vue-chartkick";
import Chart from "chart.js";
import StarRating from "vue-star-rating";

export default {
  name: "courseDashboard",
  firebase: {
    courses: db.ref("course_admin_info/data")
  },

  components: {
    StarRating
  },

  created() {
    this.course_name = this.$route.params.course_name;
  },
  computed: {
    selectedCourse: function() {
      // filter to match the parameter containing the selected course
      let ans = this.courses.filter(
        course => course.course_name == this.course_name
      );
      console.log(ans[0]);

      return ans[0];
    },
    distributionInfo: function() {
      let ans = [];
      console.log(this.selectedCourse);
      var Alvl = ["A-levels", this.selectedCourse.A_level];
      var ib = ["IB", this.selectedCourse.IB];
      var poly = ["Diploma", this.selectedCourse.Diploma];
      var others = ["Others", this.selectedCourse.Others];
      ans.push(Alvl, ib, poly, others);
      return ans;
    },
    gradeProfile: function() {
      let ans = {};
      let alvl_array = [];
      let IB_array = [];
      let poly_array = [];
      alvl_array.push(
        this.selectedCourse.rank_point_10,
        this.selectedCourse.rank_point_90
      );
      IB_array.push(this.selectedCourse.ib_10, this.selectedCourse.ib_90);
      poly_array.push(this.selectedCourse.gpa_10, this.selectedCourse.gpa_90);
      ans["A-levels"] = alvl_array;
      ans["Diploma"] = poly_array;
      ans["IB"] = IB_array;
      for (var key in ans) {
        let temp = ans[key];
        var string = temp[0] + " / " + temp[1];
        ans[key] = string;
        console.log(string);
      }
      return ans;
    }
  }
};
</script> 

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.square {
  background-color: #d3d3d3;
  width: 33.33%;
  float: left;
  margin-left: 5px;
  margin-right: 5px;
}


.Grade {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
}

.dashboardbody {
  padding-top: 10px;
}
.header {
  padding-top: 90px;
}
.stars {
  margin-left: 150px;
}

.dashboardInfo{
  padding-left: 60px;
  padding-right: 60px;
}
</style>
