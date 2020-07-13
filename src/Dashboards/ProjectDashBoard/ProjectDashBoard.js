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
import {Link} from "react-router-dom"


class ProjectDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addProjectModelOpen: false,
    };
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
              <Link to="/projects" className={"nav-link " + (this.props.match.path === "/projects" ? "active" : "")}>
                Projects
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/members" className={"nav-link " + (this.props.match.path === "/members" ? "active" : "")}>
                Members
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/datasets" className={"nav-link " + (this.props.match.path === "/datasets" ? "active" : "")}>
                Datasets
              </Link>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.props.match.path.slice(1,)}>
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
