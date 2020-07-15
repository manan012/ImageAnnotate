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
import { attachDataset } from "../../sagas/projectSagas";

class DatasetListOverview extends Component {
  constructor(props) {
    super(props);
  }

  attachDataset = (dataset) => {
    this.props.attachDataset(this.props.project._id, dataset._id);
  };

  detachDataset = (dataset) => {
    this.props.detachDataset(this.props.project._id, dataset._id);
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
              ) : this.props.project.attachedDatasets.length == 0 ? (
                <ListGroupItem>No Attached Datasets</ListGroupItem>
              ) : (
                this.props.project.attachedDatasets.map((data) => (
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
              ) : this.props.nonAttachedDatasets.length == 0 ? (
                <ListGroupItem>No Datasets</ListGroupItem>
              ) : (
                this.props.nonAttachedDatasets.map((data) => (
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
  datasets: state.datasets.datasets,
  nonAttachedDatasets: state.datasets.datasets.filter(
    (data) =>
      state.projects.project.attachedDatasets.filter((d) => d._id === data._id)
        .length === 0
  )
});

const mapDispatchToProp = (dispatch) => ({
  fetchProject: (id) => dispatch({ type: "FETCH_PROJECT", projectId: id }),
  attachDataset: (projectId, datasetId) =>
    dispatch({
      type: "ATTACH_DATASET",
      projectId: projectId,
      datasetId: datasetId,
    }),
  detachDataset: (projectId, datasetId) =>
    dispatch({
      type: "DETACH_DATASET",
      projectId: projectId,
      datasetId: datasetId,
    }),
});

export default connect(mapStateToProps, mapDispatchToProp)(DatasetListOverview);
