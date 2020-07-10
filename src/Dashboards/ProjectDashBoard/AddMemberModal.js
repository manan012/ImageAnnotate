import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Button} from 'reactstrap';
import { connect } from 'react-redux';

class AddMemberModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            role: "",
        }
    }
    handleEmailChange = (e) => {
        this.setState({email: e.target.value})
    }
    handleDescriptionChange = e => this.setState({description: e.target.value});
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addProject(this.state.name, this.state.description);
        this.props.toggle();
    }
    render() {
        return (
            <Modal isOpen={this.props.modelOpen} centered toggle={this.props.toggle} className={"w-100"}>
                <ModalHeader toggle={this.props.toggle}>Add Member</ModalHeader>
                <ModalBody>
                    <small className="text-muted"><i>Added member will have access to all projects.</i></small>
                    <Form className="mt-2" onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Input type="email" name="email" required value={this.state.email} onChange={this.handleEmailChange} placeholder="email" />
                        </FormGroup>
                        <FormGroup>
                            <label className="d-block" htmlFor="role">Organization Role</label>
                            <small className="text-muted"><i>Grants the user access to all current and future projects with the selected role.</i></small>
                            <Input type="select" name="role" id="role">
                                <option className="p-3">Admin</option>
                                <option className="p-3">Reviewer</option>
                                <option className="p-3">Team Manager</option>
                                <option className="p-3">Labeler</option>
                            </Input>
                        </FormGroup>
                        <Button type="submit" color="primary">Invite</Button>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}

const matchDispatchToProp = (dispatch) => ({
    addProject: (name, description) => dispatch({type: 'ADD_PROJECT', name, description}),
})

export default connect(null, matchDispatchToProp)(AddMemberModal);