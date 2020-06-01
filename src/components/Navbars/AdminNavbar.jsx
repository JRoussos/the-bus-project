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
import classNames from "classnames"; // nodejs library that concatenates classes
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import '../../assets/css/toggle.css'

import { withTranslation } from 'react-i18next';

// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Navbar,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";
import { connect } from "react-redux";
import { isItDark } from "../../store/actions/appAction"
import { compose } from "redux";
 
class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.state = {
      lang: "English",
      collapseOpen: false,
      haveBeenOpened: false,
      settingsOpened: false,
      color: "navbar-transparent",
      lightMode: (document.body.className === "white-content" ? false : true)
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
    this.props.dispatch(isItDark(this.state.lightMode));
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    // console.log(routeName, this.props.location.pathname)
    // this.props.location.pathname.includes("notifications")
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active-nav-elememt" : "";
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      if(document.body.className === "white-content"){
        this.setState({
          color: "bg-white"
        });
      }else {
        this.setState({
          color: "bg-dark"
        });
      }
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };

  changeLang = () => {
    this.setState({
      lang: this.state.lang==="Greek" ? "English" : "Greek"
    })
  }
  
  focusIsLost = e => {
    console.log(e)
    if(this.state.collapseOpen){
      this.setState({
        collapseOpen: false,
        color: "navbar-transparent"
      })
    }
    // if(!this.state.settingsOpened || !this.state.haveBeenOpened){
    //   this.setState({
    //     collapseOpen: false,
    //     color: "navbar-transparent"
    //   })
    // }
  }
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent"
      });
    } else {
      if(document.body.className === "white-content"){
        this.setState({
          color: "bg-white"
        });
      }else {
        this.setState({
          color: "bg-dark"
        });
      }
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  closeCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent"
      });
    } else {
      if(document.body.className === "white-content"){
        this.setState({
          color: "bg-white"
        });
      }else {
        this.setState({
          color: "bg-dark"
        });
      }
    }
    this.setState({
      collapseOpen: false
    })
  }
  // this function is to enable dark mode 
  toggleDarkMode = () => {
    if(this.state.lightMode){
      document.body.classList.add("white-content");
      localStorage.lightmode = "white-content";
      this.setState({
        lightMode: !this.state.lightMode,
        color: "bg-white"
      });
      if(this.state.collapseOpen){
        // this.toggleCollapse()
      }
    }else{
      document.body.classList.remove("white-content");
      localStorage.lightmode = "";
      this.setState({
        lightMode: !this.state.lightMode,
        color: "bg-dark"
      });
      if(this.state.collapseOpen){
        // this.toggleCollapse()
      }
    }
    // console.log(this.state.lightMode);
    this.props.dispatch(isItDark(!this.state.lightMode));
  };
  toggleSettings = () => {
    this.setState({
      settingsOpened: true
    })
  }
  toggleNotifications = () => {
    this.setState({
      haveBeenOpened: true
    })
  }
  render() {
    const { routes, logo, t, i18n  } = this.props;
    console.log(this.props);

    const changeLanguage = () =>{
      i18n.changeLanguage(this.state.lang==="Greek" ? "en" : "gr");
      this.changeLang();
    }
    
    return (
      <>
        <Navbar
          className={classNames("navbar-absolute", this.state.color)}
          expand="lg"
          // onBlur={this.focusIsLost(this)}
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.props.toggleSidebar}
                  aria-label="navbar toggle"
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              {/* <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                {this.props.brandText}
              </NavbarBrand> */}
              </div>
            {window.innerWidth < 992 ? 
            <div className="logo">
              <Link to={logo.outterLink} className="logo-small" style={{fontWeight: "500", fontSize:"16px"}}> {t(logo.text)} </Link>
            </div> :
            <Nav>
              <Link
                to={logo.outterLink}
                style={{ padding: "8px 16px"}}
              >
                <p>{t(logo.text)}</p>
              </Link>
              <div style={{borderRight: "solid 1px #9a9a9a", height: "40px"}}></div>
              {routes.map((prop, key) => {
                if (prop.redirect || !prop.showOnNav ) return null;
                return (
                  <li
                    className={this.activeRoute(prop.path)}
                    key={key}
                  >
                    <RouterNavLink
                      to={prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <p>{t(prop.name)}</p>
                    </RouterNavLink>
                  </li>
                );
              })}
            </Nav>}
            <button
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navigation"
              data-toggle="collapse"
              id="navigation"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse style={{alignSelf: "start"}} navbar isOpen={this.state.collapseOpen}>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    onClick={this.toggleNotifications}
                    nav
                  >
                    {this.state.haveBeenOpened ? null : <div className="notification d-lg-block d-xl-block"/>}
                    <i className="tim-icons icon-bell-55" />
                    <p className="d-lg-none">{t('Notifications')}</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    {this.props.notifications.map((n, index) => {
                      return(
                        <NavLink key={index} tag="li">
                          <DropdownItem className="nav-item">
                            <Link to={"/notifications/" + n[0]}>
                              <p onClick={this.closeCollapse} >{n[1].title}</p>
                            </Link>
                          </DropdownItem>
                        </NavLink>
                      )
                    } )}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                    onClick={this.toggleSettings}
                    // onClick={e => e.preventDefault()}
                  >
                    <i className="tim-icons icon-settings-gear-63"/>
                    <b className="caret d-none d-lg-block d-xl-block" />
                    <p className="d-lg-none">{t('options')}</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <NavLink tag="li">
                      <DropdownItem toggle={false} className="nav-item" onClick={this.toggleDarkMode}>
                        <Row style={{width: "200px", flexWrap: "nowrap"}} >
                          <Col sm="8" className="float-left">
                            <p>{t('darkMode')}</p>
                          </Col>
                          <Col sm="4" className="float-right">
                            <div className="switch">
                              <input type="radio" onChange={this.toggleDarkMode} checked={this.state.lightMode}/>
                              <span className="slider round"></span>
                            </div>
                          </Col>
                        </Row>
                      </DropdownItem>
                    </NavLink>
                    <NavLink tag="li">
                      <DropdownItem toggle={false} className="nav-item" onClick={() => changeLanguage()}>
                        <Row style={{width: "200px", flexWrap: "nowrap"}} >
                          <Col sm="8" className="float-left">
                            <p>{t('lang')}</p>
                          </Col>
                          <Col sm="4" className="float-right">
                            <p>{t(this.state.lang)}</p>
                            {/* <ButtonGroup className="btn-group-toggle" style={{width: "100%"}} data-toggle="buttons">
                              <Button tag="label" id="0" color="info" size="sm" className={classNames("btn-simple", {active: this.state.lang === "gr"})}>
                                <input defaultChecked className="d-none" name="options" type="radio"/>
                                <span className="d-sm-block d-md-block d-lg-block d-xl-block">gr</span>
                              </Button>
                              <Button tag="label" id="1" color="info" size="sm" className={classNames("btn-simple", {active: this.state.lang === "en"})}>
                                <input className="d-none" name="options" type="radio"/>
                                <span className="d-sm-block d-md-block d-lg-block d-xl-block">en</span>
                              </Button>
                            </ButtonGroup> */}
                          </Col>
                        </Row>
                      </DropdownItem>
                    </NavLink>
                    <NavLink tag="li">
                      <DropdownItem className="nav-item"><p>{t('settings')}</p></DropdownItem>
                    </NavLink>
                    {this.props.showBtn ? 
                    <>
                    <DropdownItem divider tag="li" />
                    <NavLink tag="li">
                      <DropdownItem onClick={this.props.installFunc} className="nav-item"><p>{t('install')}</p></DropdownItem>
                    </NavLink> 
                    </> : null }
                  </DropdownMenu>
                </UncontrolledDropdown>
                <li className="separator d-lg-none" />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { notifications } = state.firestore.data;

    if(notifications === undefined){
        return {
          notifications: state.notification.notifications
        }
    }else{
        return {
            notifications: Object.entries(notifications)
        }
    }
}

export default compose(
  connect(mapStateToProps),
  withTranslation('translations')
)(AdminNavbar);
