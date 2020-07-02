import React, { Component } from 'react';
import List from "./List";
import ListItem from './ListItem';

class ProjectList extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <List className="project-list">
                <ListItem title={"Cars"} infos={['17-label', 'Active 4 hours ago']}/>
            </List>
        )
    }
}

export default ProjectList;