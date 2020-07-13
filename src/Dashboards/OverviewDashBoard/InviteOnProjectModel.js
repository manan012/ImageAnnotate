import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody,Form, FormGroup, Input, Button } from 'reactstrap'

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
                        <Form className="mt-2" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input type="email" name="email" required value={this.state.email} onChange={this.handleEmailChange} placeholder="email" />
                            </FormGroup>
                            <Button type="submit" color="primary">Invite</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default InviteOnProjectModel
