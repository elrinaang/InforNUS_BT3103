<template>
<body>
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
    integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
    crossorigin="anonymous"
  >
  <div class="carousel">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide>
        <h1>Welcome to INFORNUS</h1>
        <img
          slot="img"
          class="d-block img-fluid w-100"
          width="1024"
          height="480"
          src="../assets/homepage.jpg"
          alt="image slot"
        >
      </b-carousel-slide>
      <b-carousel-slide caption="Courses" text="Choose the course that fits you the most.">
        <img
          slot="img"
          class="d-block img-fluid w-100"
          width="1024"
          height="480"
          src="../assets/course.jpg"
          alt="image slot"
        >
      </b-carousel-slide>
      <b-carousel-slide
        caption="Lodging"
        text="Choose the best on-campus stay for a full NUS experience."
      >
        <img
          slot="img"
          class="d-block img-fluid w-100"
          width="1024"
          height="480"
          src="../assets/lodging .jpg"
          alt="image slot"
        >
      </b-carousel-slide>
    </b-carousel>
  </div>

  <div class="information">
    <div class="title text-center">
      <br>
      <br>
      <h3>Idea behind INFORNUS</h3>
    </div>
    <br>
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col>
          <i class="fas fa-info-circle fa-3x"></i>
          <br>
          <h6>Centralised Platform for all the courses available in NUS</h6>
        </b-col>
        <b-col>
          <i class="fas fa-chart-line fa-3x"></i>
          <h6>Through Analytics, suggest courses that suits you the best.</h6>
        </b-col>
        <b-col>
          <i class="fas fa-home fa-3x"></i>
          <h6>Centralised Platform for all housing information in NUS</h6>
        </b-col>
      </b-row>
      <br>
      <br>
    </b-container>
  </div>
  <!--
  <div class="designers">
    <div class="title text-center">
      <br>
      <br>
      <h3>Brought to you by:</h3>
      <br>
   
    </div>
 
    <b-container fluid class>
      <b-row>
        <b-col>
          <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=58" alt="Image 2"></b-img>
        </b-col>
        <b-col>
          <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=58" alt="Image 2"></b-img>
        </b-col>
        <b-col>
          <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=59" alt="Image 3"></b-img>
        </b-col>
        <b-col>
          <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=59" alt="Image 3"></b-img>
        </b-col>
      </b-row>
      <br>
      <br>
    </b-container>
 
  </div>
  -->
</body>
</template>

<script>
export default {
  name: "hompage",
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>

<style scoped>
.carousel {
  padding-top: 40px;
}

.designers {
  background-color: #EFEFEF;
}
</style>


