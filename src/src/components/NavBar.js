import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

const NavBar = ({ resize }) => {
  return (
    <section className="navbar">
      <Navbar
        color="dark"
        dark
        expand
        style={{
          padding:
            resize.windowWidth <= 425
              ? ""
              : `${resize.getWidth(6)}px ${resize.getHeight(16, 8)}px`,
        }}
      >
        <NavbarBrand
          className="nav-title"
          tag={RRNavLink}
          exact
          to="/"
          style={{
            color: "antiquewhite",
            fontSize:
              resize.windowWidth <= 425 ? "16px" : `${resize.getWidth(24)}px`,
          }}
        >
          WASTE MY PRIMOS
        </NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink
              tag={RRNavLink}
              exact
              to="/myCollection"
              activeClassName="active"
              style={{
                fontSize:
                  resize.windowWidth <= 425
                    ? "10px"
                    : `${resize.getWidth(18)}px`,
              }}
            >
              My Collection
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={RRNavLink}
              exact
              to="/login"
              activeClassName="active"
              style={{
                fontSize:
                  resize.windowWidth <= 425
                    ? "10px"
                    : `${resize.getWidth(18)}px`,
              }}
            >
              Login
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </section>
  );
};
export default NavBar;
