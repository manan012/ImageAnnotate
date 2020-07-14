import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, Form, FormGroup,Table, Input, Button, Col, Nav, NavLink, NavItem, TabContent, TabPane} from 'reactstrap';
import { connect } from 'react-redux';
import FileUpload from "./FileUpload";

class AddProjectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            name: "",
            description: "",
            activeTab: "existing",
            attachedDataset: [],
            files: [],
            datasetName: ""
        }
    }
    handleNameChange = (e) => {
        this.setState({name: e.target.value})
    }
    attachDataset = (dataset) => this.setState({attachedDataset: [...this.state.attachedDataset, dataset]})
    detachDataset = (dataset) => this.setState({attachedDataset: this.state.attachedDataset.filter(d => d._id !== dataset._id)})
    toggle = (tab) => this.setState({activeTab: tab}) 
    handleDescriptionChange = e => this.setState({description: e.target.value});
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addProject(this.state.name, this.state.description, this.state.attachedDataset.map(d => d._id));
        this.setState({name: "", description: "", step: 0});
        this.props.toggle();
    }
    handleFilesInput = (files) => {
        this.setState({files: files})
    }
    
    handleDatasetNameInput = (e) => this.setState({datasetName: e.target.value});

    handleCreateDatasetSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.createDatasetWithImages(this.state.files, this.state.datasetName);
        this.setState({files: [], name: "", activeTab: "existing"});
    }
    render() {
        return (
            <Modal isOpen={this.props.modelOpen} size="lg" centered toggle={this.props.toggle} className={'center'}>
                <ModalHeader toggle={this.props.toggle}>Create Project</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.handleSubmit}>
                    <div className={"step"}><span className={(this.state.step == 0 ? 'bg-primary': "")}>1 </span>Name your project</div>
                    <div style={{display: (this.state.step == 0 ? "block" : "none")}} className="step-content">
                        <Col xs={6}>
                            <FormGroup>
                                <Input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} placeholder="Project Name" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" type="description" value={this.state.description} onChange={this.handleDescriptionChange} placeholder="Project Description" />
                            </FormGroup>
                            <Button type="button" onClick={()=>this.setState({step: 1})} color="primary" disabled={this.state.name === ""}>Next</Button>
                        </Col>
                    </div>
                    <div className="step">
                        <span className={(this.state.step == 1 ? 'bg-primary': "")}> 2 </span>Attach Dataset
                    </div>
                    <div style={{display: (this.state.step == 1 ? "block" : "none")}} className="step-content pl-3 mb-3">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={this.state.activeTab === "existing" ? "active" : ""}
                                    onClick={() => {
                                    this.toggle("existing");
                                    }}
                                >
                                    Existing data
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={this.state.activeTab === "newDataSet" ? "active" : ""}
                                    onClick={() => {
                                    this.toggle("newDataSet");
                                    }}
                                >
                                    Upload new Dataset
                                </NavLink>
                            </NavItem>
                            <NavItem>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane className="" tabId="existing">
                                <h5 className="mt-2 text-dark">Attached datasets</h5>
                                <hr className="m-0"/>
                                    <Table className="mb-0">
                                        <tbody>
                                            {
                                                this.state.attachedDataset
                                                .map(data => (
                                                    <tr>
                                                        <td className="text-dark py-2">{data.datasetName}</td>
                                                        <td className="text-dark py-2">{data.images.length} row</td>
                                                        <td className="text-dark py-2">
                                                            <Button color="basic" onClick={() => this.detachDataset(data)} className="text-danger p-0">Detach</Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            } 
                                        </tbody>
                                    </Table>
                                <h5 className="mt-2 text-dark">All datasets</h5>
                                <hr className="m-0"/>
                                <Table className="mb-0">
                                    <tbody>
                                        {
                                            this.props.datasets
                                            .filter(data => this.state.attachedDataset.filter(d => d._id === data._id).length === 0 )
                                            .map(data => (
                                                <tr>
                                                    <td className="text-dark py-2">{data.datasetName}</td>
                                                    <td className="text-dark py-2">{data.images.length} row</td>
                                                    <td className="text-dark py-2">
                                                        <Button type="button" color="basic" onClick={() => this.attachDataset(data)} className="text-primary p-0">Attach</Button>
                                                    </td>
                                                </tr>
                                            ))
                                        } 
                                    </tbody>
                                </Table>
                            </TabPane>
                            <TabPane tabId="newDataSet">
                                {
                                    this.state.files.length === 0
                                    ? 
                                        <FileUpload handleFilesInput={this.handleFilesInput} />
                                    :
                                        <Form className="mt-2"onSubmit={this.handleCreateDatasetSubmit}>
                                            <FormGroup>
                                                <Input type="text" placeholder="Dataset Name" value={this.state.datasetName} onChange={this.handleDatasetNameInput} />
                                            </FormGroup>
                                            <Button type="submit" color="primary">Add Dataset</Button>
                                        </Form>
                                }
                            </TabPane>
                        </TabContent>
                        <Button color="primary" type="button" onClick={() => this.setState({step: 0})} className="mt-2">Back</Button>
                    </div>
                    <Button type="submit" color="primary">Add Project</Button>
                </Form>
                </ModalBody>
            </Modal>
        )
    }
}

const matchStateToProps = (state) => ({
    datasets: state.datasets.datasets
})

const matchDispatchToProps = (dispatch) => ({
    addProject: (name, description, datasetIds) => dispatch({type: 'ADD_PROJECT', name, description, datasetIds}),
    createDatasetWithImages: (images, name) => dispatch({type: 'CREATE_DATASET_WITH_IMAGES', images, name})
})

export default connect(matchStateToProps, matchDispatchToProps)(AddProjectModal);