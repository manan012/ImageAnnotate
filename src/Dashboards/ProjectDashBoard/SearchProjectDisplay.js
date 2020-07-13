import React, { Component } from 'react'
import ProjectList from './ProjectList'

export class SearchProjectDisplay extends Component {
    render() {
        return (
            <div>
                <h5 className="pb-2">Search Result</h5>
                <ProjectList status={this.props.status} 
                             projects={this.props.projects} 
                             fetchProjects={this.props.fetchProjects}
                             deleteProject={this.props.deleteProject}/>
            </div>
        )
    }
}

export default SearchProjectDisplay
