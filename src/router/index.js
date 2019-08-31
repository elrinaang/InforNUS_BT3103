import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/components/HomePage";
import Lodging from "@/components/Lodging";
import courseSelectionpane from "@/components/courseSelectionpane";
import courseCareerDashboard from "@/components/courseCareerDashboard";
import courseDashboard from "@/components/courseDashboard";
import courseSearch from "@/components/courseSearch";
import lodgingDashboard from "@/components/lodgingDashboard";
import JCrecommendation from "@/components/JCrecommendation";
import polyRecommendation from "@/components/polyRecommendation";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage
    },

    {
      path: "/lodging",
      name: "Lodging",
      component: Lodging
    },

    {
      path: "/courseSelectionpane",
      name: "courseSelection",
      component: courseSelectionpane
    },
    {
      path: "/courseDashboard/:course_name",
      name: "courseDashboard",
      component: courseDashboard
    },
    {
      path: "/courseCareerDashboard/:course_name",
      name: "courseCareerDashboard",
      component: courseCareerDashboard
    },
    /*{
      path: "/courseSelection",
      name: "courseSelection",
      component: courseSelectionpane
    },*/
    {
      path: "/courseSearch",
      name: "courseSearch",
      component: courseSearch
    },
    {
      path: "/lodgingDashboard/:lodging_name",
      name: "lodgingDashboard",
      component: lodgingDashboard
    },
    {
      path: "/JCrecommendation",
      name: "JCrecommendation",
      component: JCrecommendation
    },

    {
      path: "/polyRecommendation",
      name: "polyRecommendation",
      component: polyRecommendation
    }
  ]
});
