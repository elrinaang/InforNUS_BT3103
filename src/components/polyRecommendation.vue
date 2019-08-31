<template>
<body id="searchTable">
  <b-container fluid class="search_overall">
    <div>
      <b-row>
        <b-col cols="6">
          <router-link to="/courseSearch">
            <b-button block variant="outline-primary" v-b-tooltip.hover
              title="Select me if you know what course you want!">General</b-button>
          </router-link>
        </b-col>
        <b-col cols="6">
          <b-button block variant="outline-warning" v-b-tooltip.hover
            title="Select me if you do not know what course you want!" v-b-modal.modal-1>Personalized</b-button>
        </b-col>
      </b-row>
    </div>
    <b-modal id="modal-1" hide-footer>
      <h3>Choose your pre-university qualification:</h3>
      <br>
      <router-link to="/JCrecommendation">
        <b-button block variant="outline-info">Junior College</b-button>
      </router-link>
      <br/>
      <router-link to="/polyRecommendation">
        <b-button block variant="outline-dark">Polytechnic</b-button>
      </router-link>
      <br>
    </b-modal> 
    <br/>
    <b-row>
      <b-col cols = "3" class = "searchcol">
        <h3>Search Filters:</h3>
        <h6> Enter your GPA:</h6>
        <input
        type="text"
        v-model="gpa_input"
        id="myInput"
        placeholder="Enter your GPA"
        class="search"
        >
        <br/>
        <br/>
        <h6> Input your Diploma course:</h6>
        <vue-single-select v-model="selected_diploma" :options="diplomaCourses" :required="true"></vue-single-select>
        <br>
        <h4>Filter by Faculty</h4>
        <div v-for="option in options" :key="option.text" class="filter-options">
          <input type="radio" v-model="selected" :value="option.text">
          {{ option.text }}
        </div>
        <br>
        <h4>Sort by:</h4>
        <div v-for="column in columns" :key="column.text" class="column-options">
          <input type="radio" v-model="selectedPara" :value="column.text">
          {{ column.text }}
        </div>
        <br/>
        <br/>
      </b-col>
      <b-col cols = "9">
        <table id="myTable">
          <thead>
            <tr>
              <th style="width:20%;">Course</th>
              <th style="width:20%;">Faculty</th>
              <th style="width:20%;">10th Percentile (GPA)</th>
              <th style="width:20%;">90th Percentile (GPA)</th>
              <th style="width:20%;">Starting Salary ($ per month)</th>
            </tr>
          </thead>

            <tbody>
              <tr v-for="(course, idx) in selectedCourses" :key="idx">
                <router-link
                  v-bind:to="{name:'courseDashboard', params: {course_name: course.course_name}}"
                >{{ course.course_name }}</router-link>
                <td>{{ course.home_faculty }}</td>
                <td>{{ course.gpa_10 }}</td>
                <td>{{ course.gpa_90 }}</td>
                <td>{{ course.starting_salary }}</td>
              </tr>
            </tbody>
          <br>
          <br>
        </table>
      </b-col>
    </b-row>
    </b-container>
</body>
</template>
<script>
import db from "../firebase.js";

export default {
  name: "courseSearch",
  firebase: function() {
    return {
      courses: db.ref("poly_course_info/data")
    };
  },
  data() {
    return {
      gpa_input: 4,
      selected_diploma: "Banking and Finance",
      selected: "all",
      selectedPara: "starting_salary",
      options: [
        { text: "All Faculties", value: "all" },
        { text: "School of Business", value: "Business" },
        { text: "School of Computing", value: "Computing" },
        {
          text: "School of Design and Environment",
          value: "design and environment"
        },
        { text: "Arts & Social Sciences", value: "Social Sciences" },
        { text: "Science", value: "Science" },
        { text: "Engineering", value: "Engineering" },
        { text: "Law", value: "Law" }
      ],

      columns: [
        { text: "GPA", value: "gpa_10" },
        { text: "Starting Salary", value: "starting_salary" }
      ]
    };
  },
  computed: {
    category: function() {
      if (this.selected === "School of Business") return "School of Business";
      else if (this.selected === "School of Computing")
        return "School of Computing";
      else if (this.selected === "School of Design and Environment")
        return "School of Design and Enviornment";
      else if (this.selected === "Arts & Social Sciences")
        return "Faculty of Arts and Social Sciences";
      else if (this.selected === "Science") return "Faculty of Science";
      else if (this.selected === "Law") return "Law Faculty";
      else if (this.selected === "Engineering") return "Engineering";
      else return "";
    },

    columnPara: function() {
      if (this.selectedPara === "GPA") return "gpa_10";
      else return "starting_salary";
    },

    diplomaCourses: function() {
      let output = [];

      for (var row of this.courses) {
        output.push(row.diploma_course);
      }

      return output;
    },

    selectedCourses: function() {
      let goal = this.selected_diploma;
      console.log(goal);

      // get the courses available to selected Diploma

      let list = this.courses.filter(function(x) {
        return x.diploma_course == goal;
      }); 
      
   
      list = list[0].uni_course;

      //get the courses with gpa lower than input gpa
      list = list.filter(x => x.gpa_10 <= this.gpa_input);

      console.log(list);

      let columnPara = this.columnPara;
      list.sort(function(a, b) {
        return b[columnPara] - a[columnPara];
      });

      //filter course according to the faculty selected
      list = list.filter(x => this.searchFunction(x));
      return list;
    }
  },

  methods: {
    searchFunction: function(course) {
      let catMatch =
        this.category == ""
          ? true
          : course.home_faculty.toLowerCase() == this.category.toLowerCase();

      return catMatch;
    }
  }
};
</script>

<style scoped>
.search_overall{
  padding-top: 95px;
}
.searchcol {
  background-color: #F0F0F0;
  height: 100%;
}
.search {
  width: 250px;
  height: 45px;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #FFF9E6;
}
</style>
