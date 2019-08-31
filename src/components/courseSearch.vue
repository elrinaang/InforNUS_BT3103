<template>
<body id="searchTable">
  <b-container fluid class="search_overall">
    <div>
      <b-row>
        <b-col cols="6">
          <router-link to="/courseSearch">
            <b-button
              block
              variant="outline-primary"
              v-b-tooltip.hover
              title="Select me if you know what course you want!"
            >General</b-button>
          </router-link>
        </b-col>
        <b-col cols="6">
          <b-button
            block
            variant="outline-warning"
            v-b-tooltip.hover
            title="Select me if you do not know what course you want!"
            v-b-modal.modal-1
          >Personalized</b-button>
        </b-col>
      </b-row>
    </div>
    <b-modal id="modal-1" hide-footer>
      <h3>Choose your pre-university qualification:</h3>
      <br>
      <router-link to="/JCrecommendation">
        <b-button block variant="outline-info">Junior College</b-button>
      </router-link>
      <br>
      <router-link to="/polyRecommendation">
        <b-button block variant="outline-dark">Polytechnic</b-button>
      </router-link>
      <br>
    </b-modal>
    <!--    <b-dropdown variant="warning" right text="Personalized">
          <router-link to="/JCrecommendation">
            <b-button variant="success">JC</b-button>
          </router-link>
          <b-dropdown-divider></b-dropdown-divider>
          <router-link to="/polyRecommendation">
            <b-dropdown-item>Item 3</b-dropdown-item>
          </router-link>
    </b-dropdown>-->
    <br>
    <b-row>
      <b-col cols="3" class="searchcol">
        <h3>Search Filters:</h3>
        <p>Search for your ideal course</p>
        <div class="course_search">
          <input
            type="text"
            v-model="search"
            id="myInput"
            placeholder=" Search Courses"
            class="search"
          >
        </div>
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
        <br>
        <br>
      </b-col>
      <b-col cols="9">
        <h2>Courses:</h2>
        <table id="myTable">
          <thead>
            <tr>
              <th style="width:20%;">Course</th>
              <th style="width:20%;">Faculty</th>
              <th style="width:20%;">% of Students with Honors (Highest Distinction)</th>
              <th style="width:20%;">% of Students with Honors (Distinction)</th>
              <th style="width:20%;">Starting Salary ($ per month)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(course, idx) in selectedCourses" :key="idx">
              <router-link
                v-bind:to="{name:'courseDashboard', params: {course_name: course.course_name}}"
              >{{ course.course_name }}</router-link>
              <td>{{ course.home_faculty }}</td>
              <td>{{ course.first_class }}</td>
              <td>{{ course.second_class }}</td>
              <td>{{ course.starting_salary }}</td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </b-container>
  <!--   <div class="searchBar">
    <b-jumbotron text-variant="white" class="jumbo">
      <template slot="header" class="text-center">Search for available courses:</template>
      <div>
        <router-link to="/courseSearch">
          <b-button v-b-toggle.collapse-1 variant="primary">Generalised</b-button>
        </router-link>
        <router-link to="/courseSelectionpane">
          <b-button v-b-toggle.collapse-1 variant="primary">Personalised</b-button>
        </router-link>
    </div>
      <template slot="lead">More than 100 courses available here.</template>
      <div class="course_search">
        <input
          type="text"
          v-model="search"
          id="myInput"
          placeholder="Search Courses"
          class="search"
        >
        <b-button v-b-toggle.collapse-1 variant="primary">Filter by faculty</b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <p class="card-text"></p>
            <div v-for="option in options" :key="option.text" class="filter-options">
              <input type="radio" v-model="selected" :value="option.text">
              {{ option.text }}
            </div>
          </b-card>
        </b-collapse>
        <b-button v-b-toggle.collapse-1 variant="primary">Sort by Column</b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <p class="card-text"></p>
            <div v-for="column in columns" :key="column.text" class="column-options">
              <input type="radio" v-model="selectedPara" :value="column.text">
              {{ column.text }}
            </div>
          </b-card>
        </b-collapse>
      </div>
      <div>
        <br>
        <b-button v-b-toggle.collapse-1 variant="primary">Filter by faculty</b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <p class="card-text"></p>
            <div v-for="option in options" :key="option.text" class="filter-options">
              <input type="radio" v-model="selected" :value="option.text">
              {{ option.text }}
            </div>
          </b-card>
        </b-collapse>
        
      </div>

      <div>
        <br>
        <b-button v-b-toggle.collapse-1 variant="primary">Sort by Column</b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <p class="card-text"></p>
            <div v-for="column in columns" :key="column.text" class="column-options">
              <input type="radio" v-model="selectedPara" :value="column.text">
              {{ column.text }}
            </div>
          </b-card>
        </b-collapse>
      </div>
    </b-jumbotron>
  </div>
  <table id="myTable">
    <thead>
      <tr>
        <th style="width:20%;">Course</th>
        <th style="width:20%;">Faculty</th>
        <th style="width:20%;">% of Students with Honors (Highest Distinction)</th>
        <th style="width:20%;">% of Students with Honors (Distinction)</th>
        <th style="width:20%;">Starting Salary ($ per month)</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(course, idx) in selectedCourses" :key="idx">
        <router-link
          v-bind:to="{name:'courseDashboard', params: {course_name: course.course_name}}"
        >{{ course.course_name }}</router-link>
        <td>{{ course.home_faculty }}</td>
        <td>{{ course.first_class }}</td>
        <td>{{ course.second_class }}</td>
        <td>{{ course.starting_salary }}</td>
      </tr>
    </tbody>
    <br>
    <br>
  </table>-->
</body>
</template>

<script>
import db from "../firebase.js";

export default {
  name: "courseSearch",
  firebase: function() {
    return {
      courses: db.ref("course_admin_info/data")
    };
  },
  data() {
    return {
      search: "",
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
        { text: "Highest Distinction", value: "first_class" },
        { text: "Distinction", value: "second_class" },
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
      if (this.selectedPara === "Highest Distinction") return "first_class";
      else if (this.selectedPara === "Distinction") return "second_class";
      else return "starting_salary";
    },

    selectedCourses: function() {
      let list = this.courses.filter(course => this.searchFunction(course));
      let columnPara = this.columnPara;
      list.sort(function(a, b) {
        console.log(columnPara);
        console.log(a[columnPara]);
        return b[columnPara] - a[columnPara];
      });
      return list;
    }
  },

  methods: {
    searchFunction: function(course) {
      let catMatch =
        this.category == ""
          ? true
          : course.home_faculty.toLowerCase() == this.category.toLowerCase();

      let nameMatch = course.course_name
        .toLowerCase()
        .includes(this.search.toLowerCase());
      let facultyMatch = course.home_faculty
        .toLowerCase()
        .includes(this.search.toLowerCase());

      return nameMatch | facultyMatch && catMatch;
    }
  }
};
</script>

<style scoped>
.search {
  width: 250px;
  height: 45px;
}
.filter-options {
  color: black;
}

.column-options {
  color: black;
}
.courseSearch {
  display: inline-block;
}
.search_overall {
  padding-top: 95px;
}
.searchcol {
  background-color: #F0F0F0;
  height: 100%;
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
