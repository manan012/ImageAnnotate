import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Spinner,
  Button,
} from "reactstrap";

class MemberOverviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectMembers: this.props.project.teamMemberIds,
    };
  }
  removeMember = (member) => {
    this.props.removeMember(this.props.project._id, member._id);
    this.setState({
      projectMembers: this.state.projectMembers.filter(function (
        projectMember
      ) {
        return projectMember !== member;
      }),
    });
  };

  render() {
    return (
      <div>
        <div className="adminDiv" style={{ margin: "1rem" }}>
          <Row>
            <div>
              <span
                className="adminMembersHeading"
                style={{ fontSize: "22px" }}
              >
                Admin
              </span>
            </div>
          </Row>
          <Row>
            <ListGroup style={{ width: "100%" }}>
              {this.props.status === "NOT_FETCHED" ||
              this.props.status === "FETCHING_PROJECTS" ? (
                <div
                  style={{ width: "100%", height: 400, textAlign: "center" }}
                >
                  <Spinner style={{ marginTop: 200 }} color="primary" />
                </div>
              ) : (
                <ListGroupItem>
                  <Row>
                    <Col md={4}>
                      <span>{this.props.project.userId.name} </span>
                    </Col>
                    <Col md={{ offset: 2, size: 2 }}>
                      {this.props.project.userId.email}
                    </Col>
                  </Row>
                </ListGroupItem>
              )}
            </ListGroup>
          </Row>
        </div>
        <div className="collaboratorsDiv" style={{ margin: "1rem" }}>
          <Row>
            <span className="collaboratorsHeading" style={{ fontSize: "22px" }}>
              Collaborators
            </span>
          </Row>
          <Row>
            <ListGroup style={{ width: "100%" }}>
              {this.props.status === "NOT_FETCHED" ||
              this.props.status === "FETCHING_PROJECTS" ? (
                <div
                  style={{ width: "100%", height: 400, textAlign: "center" }}
                >
                  <Spinner style={{ marginTop: 200 }} color="primary" />
                </div>
              ) : this.state.projectMembers.length == 0 ? (
                <ListGroupItem>No project members</ListGroupItem>
              ) : (
                this.state.projectMembers.map((data) => (
                  <ListGroupItem>
                    <Row>
                      <Col md={4}>
                        <span>{data.name} </span>
                      </Col>
                      <Col md={{ offset: 2, size: 2 }}>{data.email}</Col>
                      <Col md={4}>
                        <Button
                          type="button"
                          color="basic"
                          onClick={() => this.removeMember(data)}
                          className="text-primary p-0"
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))
              )}
            </ListGroup>
          </Row>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  project: state.projects.project,
});

const mapDispatchToProp = (dispatch) => ({
  fetchProject: (id) => dispatch({ type: "FETCH_PROJECT", projectId: id }),
  removeMember: (projectId, memberId) =>
    dispatch({
      type: "REMOVE_MEMBER",
      projectId: projectId,
      memberId: memberId,
    }),
});

export default connect(mapStateToProps, mapDispatchToProp)(MemberOverviewList);
