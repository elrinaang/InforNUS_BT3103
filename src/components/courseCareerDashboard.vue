<template>
<body>
  <div class="header text-center">
    <h1>
      {{this.course_name}}
      <router-link
        v-bind:to="{name:'courseDashboard', params: {course_name: selectedCourse.course_name}}"
      >
        <b-button variant="outline-primary">Admin Info</b-button>
      </router-link>
    </h1>
  </div>
  <br>
  <div>
    <b-card-group deck class="dashboardInfo">
      <b-card border-variant="info" header="Industry Breakdown" align="center">
        <b-card-text>
          <pie-chart :data="this.industryInfo"></pie-chart>
        </b-card-text>
      </b-card>
      <b-card border-variant="info" header="Starting Pay Comparison" align="center">
        <b-card-text>
          <line-chart :data="this.salaryInfo"></line-chart>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
  <br>
  <div>
    <b-card-group deck class="dashboardInfo">
      <b-card border-variant="info" header="Common Jobs" align="center">
        <b-card-text>
          <table id="jobTable">
            <thead>
              <tr>
                <th style="width:25%;">Job Title</th>
                <th style="width:25%;">Pay (per month)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value,key) in this.jobInfo" :key="key">
                <td>{{ key }}</td>
                <td>{{ value }}</td>
              </tr>
            </tbody>
          </table>
        </b-card-text>
      </b-card>
      <b-card border-variant="info" header="How have NUS experiences helped you in your current job?" align="center">
        <b-card-text>
          <b-list-group flush>
            <b-list-group-item>Relevance of Course</b-list-group-item>
            <star-rating
              class="stars"
              :rating="this.job_relevance"
              :read-only="true"
              :border-width="4"
              border-color="#d8d8d8"
              :rounded-corners="true"
              :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
            ></star-rating>
            <b-list-group-item>Usefulness of Overseas Experience (NUS related)</b-list-group-item>
            <star-rating
              class="stars"
              :rating="this.overseas_prepared"
              :read-only="true"
              :border-width="4"
              border-color="#d8d8d8"
              :rounded-corners="true"
              :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
            ></star-rating>
            <b-list-group-item>Usefulness of Local Internship (NUS related)</b-list-group-item>
            <star-rating
              class="stars"
              :rating="this.intern_prepared"
              :read-only="true"
              :border-width="4"
              border-color="#d8d8d8"
              :rounded-corners="true"
              :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
            ></star-rating>
          </b-list-group>
        </b-card-text>
      </b-card>
      <!--
        <b-card border-variant="info" header="Starting Pay Comparison" align="center">
          <b-card-text>
            <line-chart :data="this.salaryInfo"></line-chart>
          </b-card-text>
        </b-card>
      -->
    </b-card-group>
  </div>
</body>
</template>

<script>
import VueChartKick from "vue-chartkick";
import Chart from "chart.js";
import db from "../firebase.js";
import StarRating from "vue-star-rating";

export default {
  name: "courseCareerDashboard",
  firebase: {
    career_info: db.ref("student_career_info/data"),
    course_info: db.ref("course_admin_info/data")
  },
  created() {
    this.course_name = this.$route.params.course_name;
  },
  components: {
    StarRating
  },
  computed: {
    selectedCourse: function() {
      // filter to match the parameter containing the selected course
      let ans = this.course_info.filter(
        course => course.course_name == this.course_name
      );
      console.log(ans[0]);

      return ans[0];
    },

    jobInfo: function() {
      let ans = {};

      let selectStudents = this.career_info.filter(
        // returns array of students
        student =>
          student.course.toLowerCase() ==
          this.selectedCourse.course_name.toLowerCase()
      );

      for (var student of selectStudents) {
        if (student.job_title in ans) {
          let salary_array = ans[student.job_title];
          salary_array.push(student.starting_pay);
          ans[student.job_title] = salary_array;
        } else {
          let salary_array = [];
          salary_array.push(student.starting_pay);
          ans[student.job_title] = salary_array;
        }
      }
      for (var key in ans) {
        let salary_array = ans[key];
        let total = 0;
        for (var val of salary_array) total = total + val;
        let avg = total / salary_array.length;
        ans[key] = Math.round(avg);
      }
      return ans;
    },

    industryInfo: function() {
      // returns dictionary of the industries and their respective proportions of
      // graduates in that particular industry
      let ans = {};
      let selectStudents = this.career_info.filter(
        // returns array of students
        student =>
          student.course.toLowerCase() ==
          this.selectedCourse.course_name.toLowerCase()
      );

      for (var student of selectStudents) {
        if (student.industry in ans) {
          ans[student.industry] += 1;
        } else {
          ans[student.industry] = 1;
        }
      }
      return ans;
    },

    graduateSalaryInfo: function() {
      // returns avg salary for each year (for particular course)
      let ans = {};
      let selectStudents = this.career_info.filter(
        // returns array of students
        student =>
          student.course.toLowerCase() ==
          this.selectedCourse.course_name.toLowerCase()
      );

      for (var student of selectStudents) {
        if (student.graduation_year in ans) {
          let salary_array = ans[student.graduation_year.toString()];
          salary_array.push(student.starting_pay);
          ans[student.graduation_year.toString()] = salary_array;
        } else {
          let salary_array = [];
          salary_array.push(student.starting_pay);
          ans[student.graduation_year.toString()] = salary_array;
        }
      }
      for (var key of Object.keys(ans)) {
        let salary_array = ans[key];
        let total = 0;
        for (var val of salary_array) total = total + val;
        let avg = total / salary_array.length;
        ans[key] = Math.round(avg);
      }

      console.log(ans);
      return ans;
    },

    nusSalaryInfo: function() {
      // returns the avg salary for each year (whole of NUS)
      let ans = {};
      for (var student of this.career_info) {
        if (student.graduation_year in ans) {
          let salary_array = ans[student.graduation_year.toString()];
          salary_array.push(student.starting_pay);
          ans[student.graduation_year.toString()] = salary_array;
        } else {
          let salary_array = [];
          salary_array.push(student.starting_pay);
          ans[student.graduation_year.toString()] = salary_array;
        }
      }
      for (var key of Object.keys(ans)) {
        let salary_array = ans[key];
        let total = 0;
        for (var val of salary_array) total = total + val;
        let avg = total / salary_array.length;
        ans[key] = Math.round(avg);
      }

      return ans;
    },

    salaryInfo: function() {
      let ans = [
        {
          name: "Avg Starting Pay for Course Graduate",
          data: this.graduateSalaryInfo
        },
        {
          name: "Avg Starting Pay for NUS Graduate",
          data: this.nusSalaryInfo
        }
      ];

      console.log(ans);
      return ans;
    },

    overseas_prepared: function() {
      let ans = {};
      let selectStudents = this.career_info.filter(
        // returns array of students
        student =>
          student.course.toLowerCase() ==
          this.selectedCourse.course_name.toLowerCase()
      );
      let total = 0;
      for (var student of selectStudents) {
        total += student["preparation_nus_overseas"];
      }
      let avg = 0;
      avg = total / selectStudents.length;

      console.log(avg);
      return Math.round(avg);
    },

    job_relevance: function() {
      let ans = {};
      let selectStudents = this.career_info.filter(
        // returns array of students
        student =>
          student.course.toLowerCase() ==
          this.selectedCourse.course_name.toLowerCase()
      );
      let total = 0;
      for (var student of selectStudents) {
        total += student["job_relevance"];
      }
      let avg = 0;
      avg = total / selectStudents.length;
      return Math.round(avg);
    },

    intern_prepared: function() {
      let ans = {};
      let selectStudents = this.career_info.filter(
        // returns array of students
        student =>
          student.course.toLowerCase() ==
          this.selectedCourse.course_name.toLowerCase()
      );
      let total = 0;
      for (var student of selectStudents) {
        total += student["preparation_local_intern"];
      }
      let avg = 0;
      avg = total / selectStudents.length;
      console.log(avg);
      return Math.round(avg);
    }
  }
};
</script>

<style scoped>
.header {
  padding-top: 90px;
}
.container-top {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
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
  padding-right: 60px;
  padding-left: 60px;
}
.stars {
  margin-left: 100px;
}
</style>
