import React, { Component, Fragment } from 'react';
import {
    Row,
    Input,
    Button,
    Col,
} from "reactstrap";
import ProjectList from "./ProjectList";
import AddProjectModal from './AddProjectModal';

class ProjectTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addProjectModelOpen: true,
        }
    }

    toggleAddProjectModel = () => this.setState(state => ({addProjectModelOpen: !state.addProjectModelOpen}));
    render () {
        return (
            <Fragment>
                <div className="my-3">
                    <from>
                    <Row className="search-form">
                        <Col xs={6}>
                        <i className="" class="fas fa-search"></i>
                        <label className="px-1">Search</label>
                        <Input type="text" />
                        </Col>
                        <Button onClick={this.toggleAddProjectModel} className="ml-auto" color="primary">
                        New Project
                        </Button>
                    </Row>
                    </from>
                </div>    
              <ProjectList />
              <AddProjectModal modelOpen={this.state.addProjectModelOpen} toggle={this.toggleAddProjectModel} />
            </Fragment>
        )
    }
}

export default ProjectTab