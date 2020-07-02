import React, { Component } from 'react';
import ProjectItem from './ProjectItem';

class ProjectList extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="project-list w-100">
                <ProjectItem />
                <ProjectItem />
                <ProjectItem />
            </div>
    )
    }
}

export default ProjectList;