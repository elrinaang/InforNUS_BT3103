<template>
<body>
  <div class="select">
    <b-jumbotron class="jumbo">
      <template slot="header" class="text-center">Select your preferred lodging type</template>
      <b-button v-b-modal.residence_explain>Unsure of the differences?</b-button>
      <b-modal size="xl" class = "residence_modal" id="residence_explain" hide-footer>
        <h3 text-variant="black">What are the differences among the residences in NUS?</h3>
        <br/>
        <div> 
          <ul class="list-unstyled">
            <b-media tag="li">
              <h5 class="mt-0 mb-1">Halls</h5>
              <p class="mb-0">
                Emphasis is placed on student development through active involvement in community work, sport and the arts
              </p>
            </b-media>

            <b-media tag="li" class="my-4">
              <h5 class="mt-0 mb-1">Residential Colleges</h5>
              <p class="mb-0">
                Emphasis on integrated living and learening experiences. Residents not only read modules which are multidisciplinary, innovative and taught in small classes, but are also exposed to a host of different settings through Master’s Teas, forums, and talks where they actively engage with distinguished visitors and interesting speakers.
              </p>
            </b-media>
            <b-media tag="li">
              <h5 class="mt-0 mb-1">PGPR</h5>
              <p class="mb-0">
                Provides students with a minimal framework of community engagement with the flexibility to experience independent living
              </p>
            </b-media>
          </ul>
        </div> 
      </b-modal>
      <br>
      <div class="test text-center">
        <div class="filter">
          <label class="options">
            <input type="radio" v-model="selectedCategory" value="All">
            All
          </label>
          <label class="options">
            <input type="radio" v-model="selectedCategory" value="hall">
            Halls
          </label>
          <label class="options">
            <input type="radio" v-model="selectedCategory" value="college">
            Residential College
          </label>
          <label class="options">
            <input type="radio" v-model="selectedCategory" value="PGP">
            PGP
          </label>
        </div>
      </div>
    </b-jumbotron>
  </div>
  <div class="row">
    <div class="col-md-3 text-center" v-for="lodg in filteredLodging" v-bind:key="lodg.name">
      <router-link v-bind:to="{name:'lodgingDashboard', params: {lodging_name: lodg.name}}">
        <img v-bind:src="lodg.img" style="width:100%">
        <h4>{{ lodg.name }}</h4>
      </router-link>
    </div>
  </div>
</body>
</template>

<script>
class Lodging {
  constructor(name, cat, img) {
    this.name = name;
    this.cat = cat;
    this.img = img;
  }
}
export default {
  name: "halls",
  data() {
    return {
      //search: "",
      lodgings: [
        new Lodging(
          "Temasek Hall",
          "hall",
          require("../assets/temasekhall.jpg")
        ),
        new Lodging(
          "Raffles Hall",
          "hall",
          require("../assets/raffleshall.jpg")
        ),
        new Lodging("Eusoff Hall", "hall", require("../assets/eusoffhall.jpg")),
        new Lodging(
          "Kent Ridge Hall",
          "hall",
          require("../assets/kentridgehall.jpg")
        ),
        new Lodging(
          "Sheares Hall",
          "hall",
          require("../assets/sheareshall.jpg")
        ),
        new Lodging(
          "King Edward Hall",
          "hall",
          require("../assets/kingedwardhall.jpg")
        ),
        new Lodging("Tembusu", "college", require("../assets/tembusu.jpg")),
        new Lodging(
          "College of Alice and Peter Tan",
          "college",
          require("../assets/capt.jpg")
        ),
        new Lodging("RC4", "college", require("../assets/rc4.jpg")),
        new Lodging(
          "Cinnamon College",
          "college",
          require("../assets/USP.jpg")
        ),
        new Lodging(
          "Ridge View Residential College",
          "college",
          require("../assets/rvrc.jpg")
        ),
        new Lodging("PGP", "PGP", require("../assets/PGPR.jpg"))
      ],
      selectedCategory: "All"
    };
  },
  computed: {
    filteredLodging: function() {
      var vm = this;
      var category = vm.selectedCategory;

      if (category === "All") {
        return vm.lodgings;
      } else {
        return vm.lodgings.filter(function(lodg) {
          return lodg.cat === category;
        });
      }
    }
  }
};
</script>

<style scoped>
.jumbo {
  padding-top: 120px;
  background-color: #EF7C00;
  width: full;
  color: white;
}
.options {
  padding-right: 80px;
}

.row {
  padding-right: 20px;
  padding-left: 20px;
}

.residence_modal {
  color: black;
}

.list_unstyled{
  display: inline; 
}
</style>
