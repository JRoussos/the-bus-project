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
/*eslint-disable*/
import React from "react";
import { Link } from 'react-router-dom';
import { Container, Nav, NavItem, NavLink, Row } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        {/* <Container fluid>
          <div style={{display: "flex", justifyContent: "center", textAlign: "center", flexDirection: "column"}}>
            <p>Hermoupolis, 84100, Syros</p>
            <p>Tel: <a href="tel:2281082575">22810 - 82575</a></p>
          </div>
        </Container> */}
        <Container fluid>
          <Nav>
            <NavItem> 
              <Link to="/about" className="nav-link">About</Link>
            </NavItem>
            <NavItem>
              <NavLink href="mailto:giannhs632@gmail.com">Contact</NavLink>
            </NavItem>
            <NavItem>
              <Link to="#" className="nav-link">Privacy</Link>
            </NavItem>
          </Nav>
          <div className="copyright">
            © {new Date().getFullYear()} made with{" "}
            <i className="tim-icons icon-heart-2" /> by{" "}
            <a
              href="https://github.com/jroussos"
              rel="noopener noreferrer"
              target="_blank"
            >
              J.R.
            </a>{" "}
            for a better web.
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
