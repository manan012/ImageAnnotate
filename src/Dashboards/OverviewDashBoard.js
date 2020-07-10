import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  CardTitle,
  CardBody,
  Navbar,
} from "reactstrap";
import classnames from "classnames";

import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Container,
} from "reactstrap";
import ImageComponent from "./ImageComponent";
import "./OverviewDashBoard.css";
import { connect } from "react-redux";
class OverviewDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "overview",
      exportFormat: "json",
      emailNotification: false,
      activeNavItem: "bounding_box",
      annotation_image: {
        bounding_box:
          "https://www.cogitotech.com/wp-content/uploads/2019/09/object_detections.jpg",
        classification:
          "https://i1.wp.com/sefiks.com/wp-content/uploads/2017/11/cat-classification.png?resize=300%2C152&ssl=1",
        lines_and_splines:
          "https://images.squarespace-cdn.com/content/v1/5e2accdd73286210bf102db5/1580112631443-2BCAES2SNUIBYRZ5WTP1/ke17ZwdGBToddI8pDm48kFTEgwhRQcX9r3XtU0e50sUUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcW7uEhC96WQdj-SwE5EpM0lAopPba9ZX3O0oeNTVSRxdHAmtcci_6bmVLoSDQq_pb/WhatsApp+Image+2020-01-27+at+10.29.19+AM.jpeg?format=2500w",
        polygons:
          "https://www.scalehub.com/wp-content/uploads/2020/02/polygons-object-detection-training-data-computer-vision-crowd-worker-scalehub-1-400x400.jpg",
        point: "https://i.stack.imgur.com/CDK3k.jpg",
      },
    };
  }

  componentWillMount = () => {
    console.log("executed");
    this.props.fetchProject(this.props.match.params.projectId);
  }

  activateNavItem = (navName) => {
    this.setState({
      activeNavItem: navName,
    });
  };

  setActiveTab = (tab) => this.setState({ activeTab: tab });
  toggle = (tab) => {
    if (this.state.activeTab != tab) this.setActiveTab(tab);
  };

  // selecting the export format
  onSelectChange = () => {
    this.setState({
      exportFormat: document.getElementById("export_format").value,
    });
  };

  emailNotificationToggle = () => {
    this.setState({
      emailNotification: !this.state.emailNotification,
    });
  };

  render() {
    console.log(this.props);
    return (
      this.props.project.status != 'FETCHING_PROJECT' 
      &&
      <Container>
        <div className="project_info_div">
          <Row>
            <Col md={6}>
              <div class="project_name">
                <h2>{this.props.project.name}</h2>
              </div>
            </Col>
            <Col md={{ span: 4, offset: 4 }}>
              <Button style={{ backgroundColor: "blue" }}>
                <span class="labelling">Start Labelling</span>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="project_desc">
                <h6>{this.props.project.description}</h6>
              </div>
            </Col>
          </Row>
        </div>
        <div>
          <Nav tabs>
            {/* Start Overview Nav Tab */}
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "overview",
                })}
                onClick={() => {
                  this.toggle("overview");
                }}
              >
                Overview
              </NavLink>
            </NavItem>
            {/* End Overview Nav Tab */}

            {/* Start Export Nav Tab */}
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "export",
                })}
                onClick={() => {
                  this.toggle("export");
                }}
              >
                Export
              </NavLink>
            </NavItem>
            {/* End Export Nav Tab */}
          </Nav>

          <TabContent className="mt-2" activeTab={this.state.activeTab}>
            {/* Start overview TabPane */}
            <TabPane
              // className="d-flex flex-col align-items-stretch"
              tabId="overview"
            >
              <div className="overview_master_div">
                <Row className="overview_first_row">
                  <Col md={{ span: 6, offset: 2 }}>
                    <Card className="progress_card">
                      <CardBody className="card_body_title">
                        <CardTitle className="progress_title">
                          Progress
                        </CardTitle>
                      </CardBody>
                      <CardBody className="card_body_text">
                        <Row>
                          <div className="progress_metrics">
                            <div className="progress_metrics_value">10</div>
                            <div className="progress_metrics_name">
                              <span>Submitted</span>
                            </div>
                          </div>
                          <div className="progress_metrics">
                            <div className="progress_metrics_value">16</div>
                            <div className="progress_metrics_name">
                              <span>Remaining</span>
                            </div>
                          </div>
                          <div className="progress_metrics">
                            <div className="progress_metrics_value">0</div>
                            <div className="progress_metrics_name">
                              <span>Skipped</span>
                            </div>
                          </div>
                          <div className="progress_metrics">
                            <div className="progress_metrics_value">39%</div>
                            <div className="progress_metrics_name">
                              <span>Complete</span>
                            </div>
                          </div>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Row className="overview_second_row">
                  <Col md={4} style={{ paddingRight: "0rem" }}>
                    <Navbar style={{ padding: "0rem" }}>
                      <Nav vertical>
                        <NavItem>
                          <NavLink
                            onClick={() => {
                              console.log("bouding_box");
                              this.activateNavItem("bounding_box");
                            }}
                            className="vertical_navbar_navlinks"
                          >
                            <Card
                              style={{
                                backgroundColor:
                                  this.state.activeNavItem === "bounding_box"
                                    ? "#6ab9e6"
                                    : "white",
                              }}
                            >
                              <CardBody className="card_body_title">
                                <CardTitle>Bounding Box</CardTitle>
                              </CardBody>
                              <CardBody className="card_body_text">
                                <div
                                  style={{
                                    marginLeft: "1rem",
                                    display:
                                      this.state.activeNavItem ===
                                      "bounding_box"
                                        ? "block"
                                        : "none",
                                    padding: "0rem",
                                  }}
                                >
                                  <span>
                                    Annotation to describe the width, height and
                                    location of target objects
                                  </span>
                                </div>
                              </CardBody>
                            </Card>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            onClick={() => {
                              console.log("classification");
                              this.activateNavItem("classification");
                            }}
                            className="vertical_navbar_navlinks"
                          >
                            <Card
                              style={{
                                backgroundColor:
                                  this.state.activeNavItem === "classification"
                                    ? "#6ab9e6"
                                    : "white",
                              }}
                            >
                              <CardBody className="card_body_title">
                                <CardTitle>Classification</CardTitle>
                              </CardBody>
                              <CardBody className="card_body_text">
                                <div
                                  style={{
                                    marginLeft: "1rem",
                                    display:
                                      this.state.activeNavItem ===
                                      "classification"
                                        ? "block"
                                        : "none",
                                    padding: "0rem",
                                  }}
                                >
                                  <span>
                                    Classify images into pre-defined categories
                                  </span>
                                </div>
                              </CardBody>
                            </Card>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            onClick={() => {
                              this.activateNavItem("lines_and_splines");
                            }}
                            className="vertical_navbar_navlinks"
                          >
                            <Card
                              style={{
                                backgroundColor:
                                  this.state.activeNavItem ===
                                  "lines_and_splines"
                                    ? "#6ab9e6"
                                    : "white",
                              }}
                            >
                              <CardBody className="card_body_title">
                                <CardTitle>Lines and Spines</CardTitle>
                              </CardBody>
                              <CardBody className="card_body_text">
                                <div
                                  style={{
                                    marginLeft: "1rem",
                                    display:
                                      this.state.activeNavItem ===
                                      "lines_and_splines"
                                        ? "block"
                                        : "none",
                                    padding: "0rem",
                                  }}
                                >
                                  <span>
                                    Annotation of straigt or curved lines,
                                    polylines or splines
                                  </span>
                                </div>
                              </CardBody>
                            </Card>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            onClick={() => {
                              this.activateNavItem("point");
                            }}
                            className="vertical_navbar_navlinks"
                          >
                            <Card
                              style={{
                                backgroundColor:
                                  this.state.activeNavItem === "point"
                                    ? "#6ab9e6"
                                    : "white",
                              }}
                            >
                              <CardBody className="card_body_title">
                                <CardTitle>Point</CardTitle>
                              </CardBody>
                              <CardBody className="card_body_text">
                                <div
                                  style={{
                                    marginLeft: "1rem",
                                    display:
                                      this.state.activeNavItem === "point"
                                        ? "block"
                                        : "none",
                                    padding: "0rem",
                                  }}
                                >
                                  <span>
                                    Annotation of landmarks on objects of
                                    interest
                                  </span>
                                </div>
                              </CardBody>
                            </Card>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            onClick={() => {
                              this.activateNavItem("polygons");
                            }}
                            className="vertical_navbar_navlinks"
                          >
                            <Card
                              style={{
                                backgroundColor:
                                  this.state.activeNavItem === "polygons"
                                    ? "#6ab9e6"
                                    : "white",
                              }}
                            >
                              <CardBody className="card_body_title">
                                <CardTitle>Polygons</CardTitle>
                              </CardBody>
                              <CardBody className="card_body_text">
                                <div
                                  style={{
                                    marginLeft: "1rem",
                                    display:
                                      this.state.activeNavItem === "polygons"
                                        ? "block"
                                        : "none",
                                    padding: "0rem",
                                  }}
                                >
                                  <span>
                                    Annotation of exact edges for precise
                                    definition
                                  </span>
                                </div>
                              </CardBody>
                            </Card>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </Navbar>
                  </Col>
                  <Col md={6} style={{ paddingLeft: "0rem" }}>
                    <div>
                      <ImageComponent
                        image_src={
                          this.state.annotation_image[this.state.activeNavItem]
                        }
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
            {/* End overview TabPane */}

            {/* Start Export TabPane */}
            <TabPane tabId="export">
              <div className="export_master_div">
                <Row className="export_first_row">
                  <Col md={3}>
                    <div>
                      <span className="subheading">Export Format</span>
                    </div>
                    <div style={{ marginLeft: "0.5rem" }}>
                      <span className="subheading_desc">
                        Choose the type of export
                      </span>
                    </div>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <div>
                      <select
                        class="form-control"
                        id="export_format"
                        onChange={this.onSelectChange}
                      >
                        <option value="json">JSON</option>
                        <option value="csv">CSV</option>
                      </select>
                    </div>
                  </Col>
                </Row>

                <Row className="export_second_row">
                  <Col md={3}>
                    <div>
                      <span className="subheading">Email Notification</span>
                    </div>
                    <div style={{ marginLeft: "0.5rem" }}>
                      <span className="subheading_desc">
                        Send Download Link when export ready
                      </span>
                    </div>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <div>
                      <label class="switch">
                        <input
                          type="checkbox"
                          onChange={this.emailNotificationToggle}
                        ></input>
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </Col>
                </Row>

                <Row className="export_third_row">
                  <Col md={3}>
                    <div>
                      <Button style={{ backgroundColor: "blue" }}>
                        <span>Generate Export</span>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
            {/* End Export TabPane */}
          </TabContent>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.projects.project
})

const mapDispatchToProp = (dispatch) => ({
  fetchProject: (id) => dispatch({type: 'FETCH_PROJECT', projectId: id})
})

export default connect(mapStateToProps, mapDispatchToProp)(OverviewDashBoard);
