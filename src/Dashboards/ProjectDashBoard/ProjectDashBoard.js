import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Container,
} from "reactstrap";
import MembersTab from "./MembersTab";
import AddDatasetTab from "./AddDatasetTab";
import ProjectTab from "./ProjectTab";


class ProjectDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "projects",
      addProjectModelOpen: false,
    };
  }

  componentWillMount() {
  }

  setActiveTab = (tab) => this.setState({ activeTab: tab });
  toggle = (tab) => {
    if (this.state.activeTab != tab) this.setActiveTab(tab);
  };
  render() {
    return (
      <Container>
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={this.state.activeTab === "projects" ? "active" : ""}
                onClick={() => {
                  this.toggle("projects");
                }}
              >
                Projects
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={this.state.activeTab === "members" ? "active" : ""}
                onClick={() => {
                  this.toggle("members");
                }}
              >
                Members
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={this.state.activeTab === "datasets" ? "active" : ""}
                onClick={() => {
                  this.toggle("datasets");
                }}
              >
                Datasets
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane className="" tabId="projects">
              <ProjectTab />
            </TabPane>
            <TabPane tabId="members">
              <MembersTab />
            </TabPane>
            <TabPane tabId="datasets">
              <AddDatasetTab />
            </TabPane>
          </TabContent>
        </div>
      </Container>
    );
  }
}
export default (ProjectDashBoard);
