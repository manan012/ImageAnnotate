import React, { Component } from "react";
import {
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Container,
  Form,
  Input,
  Button,
  Col,
} from "reactstrap";
import ProjectList from "./ProjectList";
import MembersTab from "./MembersTab";
import AddDatasetTab from "./AddDatasetTab";
import axios from "axios";
class ProjectDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "members",
    };

    var body = JSON.stringify({
      x_auth_token: localStorage.getItem("token"),
    });
    axios
      .post("api/users/verify", body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        this.setState({ userId: response.data.userId });
      })
      .catch((err) => {
        console.log(err);
      });
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
              <div className="my-3">
                <from>
                  <Row className="search-form">
                    <Col xs={6}>
                      <i className="" class="fas fa-search"></i>
                      <label className="px-1">Search</label>
                      <Input type="text" />
                    </Col>
                    <Button className="ml-auto" color="primary">
                      New Project
                    </Button>
                  </Row>
                </from>
              </div>

              <ProjectList />
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

export default ProjectDashBoard;
