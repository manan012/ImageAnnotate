import React, { Component } from 'react';
import List from "../List";
import ListItem from '../ListItem';
import {connect} from 'react-redux';
import { Spinner } from 'reactstrap';

class ProjectList extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <List className="project-list">
                {   this.props.status === "NOT_FETCHED" || this.props.status === 'FETCHING_PROJECTS' ? 
                        <div style={{width: "100%", height: 400, textAlign:"center"}}>
                            <Spinner style={{marginTop: 200}} color="primary" />
                        </div>
                        :
                        this.props.projects.map(project => <ListItem key={project._id} 
                                                                     to={"/overview/"+project._id}
                                                                     id={project._id} 
                                                                     title={project.name} 
                                                                     onDelete={() => this.props.deleteProject(project._id)}
                                                                     infos={[]}/>)
                }
            </List>
        )
    }
}


export default ProjectList;