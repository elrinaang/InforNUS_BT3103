<template>
<body>
  <b-navbar class="topnav" topmargin="0">
    <img src="../assets/applogo.jpg" width="80" height="70">
    <router-link to="/">Home</router-link>
    <router-link to="/courseSearch">Course</router-link>
    <router-link to="/lodging">Lodging</router-link>
  </b-navbar>
</body>
</template>

<style scoped>
.topnav {
  background-color: #003d7c;
  overflow: hidden;
  position: fixed;
  width: 100vw;
  z-index: 200;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #4caf50;
  color: white;
}
</style>
