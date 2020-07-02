import React, { Component } from "react";

class ProjectItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdownOpen: false,
        }
    }

    dropDrownToggle = () => this.setState({dropdownOpen: !this.state.dropdownOpen});
    render() {
        return (
            <div className="project-list-item">
                <div className="project-list-title">
                    <div className="project-list-tiem-icon">
                        M
                    </div>
                    <div className="project-list-item-text">
                        M project
                    </div>
                </div>
                <div className="project-list-description">
                    <div className="project-list-item-status">
                        <span className="label-count">17-label</span>
                        <span className="active-status">Active 4 hours ago</span>
                    </div>
                    <div className="project-list-drop-down">
                        <div className="dropdown">
                            <button className="btn" type="button" onClick={this.dropDrownToggle} data-toggle="dropdown">
                                <i className="fas fa-ellipsis-v"></i>
                            </button>
                            <div className={"dropdown-menu " + (this.state.dropdownOpen ? "show" : "")}>
                                <a className="dropdown-item" href="#">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectItem;