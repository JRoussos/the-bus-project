/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { lazy } from "react";

// import Dashboard from "views/Dashboard.jsx";
// import Icons from "views/Icons.jsx";
// import Notifications from "views/Notifications.jsx";
// import TableList from "views/TableList.jsx";
// import Typography from "views/Typography.jsx";
// import UserProfile from "views/UserProfile.jsx";
// import Home from "views/Home";
// import Details from "views/components/RouteDetails";
// import About from "./views/About"

const Home = lazy( () => import("./views/Home"));
const Details = lazy( () => import("./views/components/RouteDetails"));
const About = lazy( () => import("./views/About"));
const Notifications = lazy( () => import("./views/NotificationsDetails"));
const Timetable = lazy( () => import("./views/FullTimetable"));

var routes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   showOnNav: false,
  //   icon: "tim-icons icon-chart-pie-36",
  //   component: Dashboard,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   showOnNav: false,
  //   icon: "tim-icons icon-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  {
    path: "/home",
    name: "Home",
    showOnNav: true,
    icon: "tim-icons icon-bus-front-12",
    component: Home
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   showOnNav: false,
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  {
    path: "/timetable",
    name: "Timetable",
    showOnNav: true,
    icon: "tim-icons icon-calendar-60",
    component: Timetable
  },
  {
    path: "/notifications/:id",
    name: "Notifications",
    showOnNav: false,
    icon: "tim-icons icon-bell-55",
    component: Notifications
  },
  {
    path: "/notifications/full",
    name: "Notifications",
    showOnNav: true,
    icon: "tim-icons icon-bell-55",
    component: Notifications
  },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   showOnNav: false,
  //   icon: "tim-icons icon-single-02",
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   showOnNav: false,
  //   icon: "tim-icons icon-puzzle-10",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   showOnNav: false,
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/admin"
  // },
  {
    path: "/about",
    name: "About",
    showOnNav: true,
    icon: "tim-icons icon-puzzle-10",
    component: About
  },
  {
    path: "/details",
    name: "Details",
    showOnNav: false,
    icon: "tim-icons icon-compass-05",
    component: Details
  }
];
export default routes;
