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

class DatasetListOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attachedDatasets: this.props.project.attachedDatasets,
      nonAttachedDatasets: [],
    };
  }
  componentWillMount = () => {
    var non_attached = this.props.users.datasets.filter(
      (data) =>
        this.props.project.attachedDatasets.filter((d) => d._id === data._id)
          .length === 0
    );
    this.setState({
      nonAttachedDatasets: non_attached,
    });
  };

  attachDataset = (dataset) => {
    this.setState({
      attachedDatasets: [...this.state.attachedDatasets, dataset],
    });
    this.setState({
      nonAttachedDatasets: this.state.nonAttachedDatasets.filter(function (
        nonAttachedDataset
      ) {
        return nonAttachedDataset !== dataset;
      }),
    });
  };

  detachDataset = (dataset) => {
    this.setState({
      nonAttachedDatasets: [...this.state.nonAttachedDatasets, dataset],
    });
    this.setState({
      attachedDatasets: this.state.attachedDatasets.filter(function (
        attachedDataset
      ) {
        return attachedDataset !== dataset;
      }),
    });
  };

  render() {
    return (
      <div>
        <div className="attachedDatasetsDiv" style={{ margin: "1rem" }}>
          <Row>
            <div>
              <span
                className="attachedDatasetHeading"
                style={{ fontSize: "22px" }}
              >
                Attached Datasets
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
              ) : this.state.attachedDatasets.length == 0 ? (
                <ListGroupItem>No Attached Datasets</ListGroupItem>
              ) : (
                this.state.attachedDatasets.map((data) => (
                  <ListGroupItem>
                    <Row>
                      <Col md={2}>
                        <span>{data.datasetName} </span>
                      </Col>
                      <Col md={{ offset: 3, size: 3 }}>
                        {data.images.length} rows
                      </Col>
                      <Col md={4}>
                        <Button
                          type="button"
                          color="basic"
                          onClick={() => this.detachDataset(data)}
                          className="text-primary p-0"
                        >
                          Detach
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))
              )}
            </ListGroup>
          </Row>
        </div>
        <div className="nonAttachedDatasetsDiv" style={{ margin: "1rem" }}>
          <Row>
            <div>
              <span
                className="nonAttachedDatasetHeading"
                style={{ fontSize: "22px" }}
              >
                All Datasets
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
              ) : this.state.nonAttachedDatasets.length == 0 ? (
                <ListGroupItem>No Datasets</ListGroupItem>
              ) : (
                this.state.nonAttachedDatasets.map((data) => (
                  <ListGroupItem>
                    <Row>
                      <Col md={2}>
                        <span>{data.datasetName} </span>
                      </Col>
                      <Col md={{ offset: 3, size: 3 }}>rows</Col>
                      <Col md={4}>
                        <Button
                          type="button"
                          color="basic"
                          onClick={() => this.attachDataset(data)}
                          className="text-primary p-0"
                        >
                          Attach
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
  users: state.user,
  project: state.projects.project,
});

const mapDispatchToProp = (dispatch) => ({
  fetchProject: (id) => dispatch({ type: "FETCH_PROJECT", projectId: id }),
});

export default connect(mapStateToProps, mapDispatchToProp)(DatasetListOverview);
