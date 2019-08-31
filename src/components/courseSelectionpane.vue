<template>
<body>
  <div class="selection_overall">
    <router-link to="/courseSearch">
      <b-card img-src="../assets/general.jpg" img-alt="Card image" img-left class="mb-3">
        <b-card-text>
          <h3> General </h3>
          <p>Description of what general is </p>
        </b-card-text>
      </b-card>
    </router-link>
    <router-link to="/JCrecommendation">
      <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-right>
        <b-card-text>
          <h3>Personalized</h3>
          <p>description of what personalized is</p>
        </b-card-text>
      </b-card>
    </router-link>
  </div>

  <!--  <div class="jc_selection_pane" style="float:left"> 
    <router-link to="/JCrecommendation">
    <img id="jc_image" src="../assets/jc_image.jpg"> 
    </router-link> 
  </div>

  <div class="poly_selection_pane" style="float:right"> 
    <router-link to="/polyRecommendation"> 
    <img id="poly_image" src="../assets/poly_image.jpg"> 
    </router-link> 
  </div>-->
</body>
</template>

<script>
export default {
  name: "selectionPane",
  props: {}
};
</script>

<style scoped>
.selection_overall {
  padding-top: 70px;
}
</style>
