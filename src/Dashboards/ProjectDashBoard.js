import React, { Component } from 'react';
import {Nav, NavItem, NavLink, TabContent, TabPane, Container, } from "reactstrap";
class ProjectDashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'projects',
        }
    }
    
    setActiveTab = (tab) => this.setState({activeTab:tab});
    toggle = (tab) => {if (this.state.activeTab !=tab) this.setActiveTab(tab)}

    render() {
        return (
            <Container>
                <div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={this.state.activeTab==="projects" ? "active" : ""}
                                onClick={() => { this.toggle('projects'); }}
                            >
                                Projects
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent className="mt-2" activeTab={this.state.activeTab}>
                        <TabPane className="d-flex flex-col align-items-stretch" tabId="projects">
                            <div style={{ height: 10, backgroundColor: "red"}}></div>
                        </TabPane>
                    </TabContent>
                </div>
            </Container>
        )
    }
}

export default ProjectDashBoard;