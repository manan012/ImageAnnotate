import React, { Component } from 'react';
import {Row, Nav, NavItem, NavLink, TabContent, TabPane, Container, Form, Input, Button, Col} from "reactstrap";
import ProjectList from './ProjectList';
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
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane className="" tabId="projects">
                            <div className="my-3">
                                <from>
                                    <Row className="search-form">
                                        <Col xs={6}>
                                            <i className="" class="fas fa-search"></i>
                                            <label className="px-1">Search</label>
                                            <Input type="text"/>
                                        </Col>
                                        <Button className="ml-auto" color="primary">New Project</Button>
                                    </Row>
                                </from>
                            </div>
                            <ProjectList />
                        </TabPane>
                    </TabContent>
                </div>
            </Container>
        )
    }
}

export default ProjectDashBoard;