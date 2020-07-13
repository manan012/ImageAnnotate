import React, { Component, Fragment } from 'react';
import {
    Row,
    Input,
    Button,
    Col,
} from "reactstrap";
import ProjectList from "./ProjectList";
import AddProjectModal from './AddProjectModal';
import SearchProjectDisplay from './SearchProjectDisplay';
import { connect } from 'react-redux';
import { match } from 'ramda';

class ProjectTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addProjectModelOpen: false,
            searchKey: ""
        }
    }

    handleSearchKeyChange = (e) => {
        this.setState({searchKey: e.target.value});
    }

    componentWillMount() {
        if (this.props.status === 'NOT_FETCHED') {
            this.props.fetchProjects();
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
                        <Input type="text" value={this.state.searchKey} onChange={this.handleSearchKeyChange}/>
                        </Col>
                        <Button onClick={this.toggleAddProjectModel} className="ml-auto" color="primary">
                            New Project
                        </Button>
                    </Row>
                    </from>
                </div>    
                { this.state.searchKey.length === 0 &&
                  <ProjectList status={this.props.status} 
                           projects={this.props.projects} 
                           fetchProjects={this.props.fetchProjects}
                           deleteProject={this.props.deleteProject}/>
                }
                {  this.state.searchKey.length > 0 &&
                  <SearchProjectDisplay status={this.props.status} 
                                    projects={this.props.projects.filter(p => match(this.state.searchKey.toLowerCase(), p.name.toLowerCase()).length > 0)} 
                                    fetchProjects={this.props.fetchProjects}
                                    deleteProject={this.props.deleteProject}/> 
                }
              <AddProjectModal modelOpen={this.state.addProjectModelOpen} toggle={this.toggleAddProjectModel} />
            </Fragment>
        )
    }
}

const matchStateToProp = (state) => ({
    status: state.projects.status,
    projects: state.projects.projects
})

const matchDispatchToProp = (dispatch) => ({
    fetchProjects: () => dispatch({type:'FETCH_PROJECTS'}),
    deleteProject: (id) => dispatch({type: 'DELETE_PROJECT', id: id})
})

export default connect(matchStateToProp, matchDispatchToProp)(ProjectTab)