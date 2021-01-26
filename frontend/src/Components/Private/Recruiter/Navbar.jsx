import React, { useState } from "react";
import Logout from "../../Public/Logout";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

const Navbar_R = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Job-Portal</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/jobOpenings_r">My Job Openings</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/makeJobOpenings_r">Make a JobOpenings</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/selectedApplicants_r">My Selected Applicants</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavItem>
                    <NavLink href="/profile_r">Profile</NavLink>
                  </NavItem>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Logout />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navbar_R;
