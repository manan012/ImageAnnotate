import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody,Form, FormGroup, Input, Button } from 'reactstrap'
import ValidatorForm from 'react-form-validator-core/lib/ValidatorForm';
import ValidatedInput from '../../Form/ValidatedInput';

export class InviteOnProjectModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        }
    }

    handleEmailChange = (e) => this.setState({email: e.target.value})

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.invite(this.state.email);
        this.setState({email: ""});
        this.props.toggle();
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.props.modelOpen} centered toggle={this.props.toggle} className={"w-100"}>
                    <ModalHeader toggle={this.props.toggle}>Invite Member</ModalHeader>
                    <ModalBody>
                        <small className="text-muted"><i>Invited member will only have access to this projects.</i></small>
                        <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
                            <ValidatedInput 
                                name="email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                                placeholder={"Email"}
                                validators={['required', 'isEmail']}
                                errorMessages={['This field is required',  'Enter Valid Email']}
                            />
                            <Button type="submit" color="primary">Invite</Button>
                        </ValidatorForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default InviteOnProjectModel
