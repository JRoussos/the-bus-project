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
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
// import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import routes from "routes.js";

import "../../assets/css/loading-animation.css"
import logo from "assets/img/react-logo.png"; 
import { Suspense } from "react";

// var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      width: window.innerWidth,
      installButton: false,
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    };
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  installApp = async () => {
    console.log("Install function fired")
    if(!this.installPrompt) return false;
    this.installPrompt.prompt();
    let outcome = await this.installPrompt.userChoice;
    if(outcome.outcome === 'accepted'){
      console.log("App Installed")
    }
    else{
      console.log("App not installed");
    }
    // Remove the event reference
    this.installPrompt = null;
    // Hide the button
    this.setState({
      installButton: false
    })
  }

  installPrompt = null;
  componentDidMount() {
    console.log("Listening for Install prompt");
    window.addEventListener('beforeinstallprompt', e => {
      // For older browsers
      e.preventDefault();
      console.log("Install Prompt fired");
      this.installPrompt = e;
      // See if the app is already installed, in that case, do nothing
      if((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true){
        return false;
      }
      // Set the state variable to make button visible
      this.setState({
        installButton: true
      })
    })

    // if (navigator.platform.indexOf("Win") > -1) {
    //   document.documentElement.className += " perfect-scrollbar-on";
    //   document.documentElement.classList.remove("perfect-scrollbar-off");
    //   ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true, wheelSpeed: 0.5 });
    //   let tables = document.querySelectorAll(".table-responsive");
    //   for (let i = 0; i < tables.length; i++) {
    //     ps = new PerfectScrollbar(tables[i]);
    //   }
    // }
    window.addEventListener('resize', this.handleWindowSizeChange);
  }
  componentWillUnmount() {
    // if (navigator.platform.indexOf("Win") > -1) {
    //   ps.destroy();
    //   document.documentElement.className += " perfect-scrollbar-off";
    //   document.documentElement.classList.remove("perfect-scrollbar-on");
    // }
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }
  componentDidUpdate(e) {
    // if (e.history.action === "PUSH") {
    //   if (navigator.platform.indexOf("Win") > -1) {
    //     let tables = document.querySelectorAll(".table-responsive");
    //     for (let i = 0; i < tables.length; i++) {
    //       ps = new PerfectScrollbar(tables[i]);
    //     }
    //   }
    //   document.documentElement.scrollTop = 0;
    //   document.scrollingElement.scrollTop = 0;
    //   this.refs.mainPanel.scrollTop = 0;
    // }
    // console.log(this.props)
  }
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      // if (prop.layout === "/admin") {
        return (
          <Route
            path={ prop.path}
            component={prop.component}
            key={key}
          />
        );
      // } else {
      //   return null;
      // }
    });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
        <div className="wrapper">
          {this.state.width < 992 ? 
          <Sidebar
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            logo={{
              outterLink: "/home",
              text: "KTEL Syros",
              imgSrc: logo
            }}
            toggleSidebar={this.toggleSidebar}
          /> 
          : null }
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            <AdminNavbar
              {...this.props}
              routes = {routes}
              logo={{
                outterLink: "/home",
                text: "KTEL Syros",
                imgSrc: logo
              }}
              showBtn={this.state.installButton}
              installFunc={this.installApp}
              brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />
            <Suspense fallback={
              <div style={{height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              </div>
            }>
              <Switch>{this.getRoutes(routes)}</Switch>
            </Suspense>
            <Footer fluid />
          </div>
          {this.props.history.location.pathname === "/" ? <Redirect to="/home"/> : null }
        </div>
    );
  }
}

export default Admin;
