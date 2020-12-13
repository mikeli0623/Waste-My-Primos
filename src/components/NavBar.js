import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div className="navbar">
      <Navbar color="dark" dark>
        <NavbarBrand
          tag={RRNavLink}
          exact
          to="/"
          style={{ color: "antiquewhite" }}
        >
          WASTE MY PRIMOS
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        {/* <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink
                onClick={toggleNavbar}
                tag={RRNavLink}
                exact
                to="/myCollection"
                activeClassName="active"
              >
                My Collection
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={toggleNavbar}
                tag={RRNavLink}
                exact
                to="/login"
                activeClassName="active"
              >
                Login
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse> */}
      </Navbar>
    </div>
  );
};
export default NavBar;
