import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const CollectionTabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav className="collection-tabs" tabs>
      <NavItem>
        <NavLink
          className={activeTab === 1 ? "active" : undefined}
          onClick={() => {
            toggleTab(1);
          }}
        >
          All
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={activeTab === 2 ? "active" : undefined}
          onClick={() => {
            toggleTab(2);
          }}
        >
          Characters
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={activeTab === 3 ? "active" : undefined}
          onClick={() => {
            toggleTab(3);
          }}
        >
          Weapons
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default CollectionTabs;
