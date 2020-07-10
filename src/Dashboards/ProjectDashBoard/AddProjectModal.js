import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Button} from 'reactstrap';
import { connect } from 'react-redux';

class AddProjectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
        }
    }
    handleNameChange = (e) => {
        this.setState({name: e.target.value})
    }
    handleDescriptionChange = e => this.setState({description: e.target.value});
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addProject(this.state.name, this.state.description);
        this.props.toggle();
    }
    render() {
        return (
            <Modal isOpen={this.props.modelOpen} centered toggle={this.props.toggle} className={'center'}>
                <ModalHeader toggle={this.props.toggle}>Create Project</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} placeholder="Project Name" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" type="description" value={this.state.description} onChange={this.handleDescriptionChange} placeholder="Project Description" />
                    </FormGroup>
                    <Button type="submit" color="primary">Add Project</Button>
                </Form>
                </ModalBody>
            </Modal>
        )
    }
}

const matchDispatchToProp = (dispatch) => ({
    addProject: (name, description) => dispatch({type: 'ADD_PROJECT', name, description}),
})

export default connect(null, matchDispatchToProp)(AddProjectModal);