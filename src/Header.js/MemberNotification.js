import React, { Component } from 'react'
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap'
import { map } from 'ramda';
import { connect } from 'react-redux';

export class MemberNotification extends Component {
    constructor(props) {
        super(props);
        this.state={
            open: false,
        }
    }
    toggle = () => this.setState(state => ({open: !state.open}))
    handleAcceptInvitation = () => {
        this.props.acceptInvitation(this.props.notification._id);
        this.toggle();
    }
    handleRejectInvitation = () => {
        this.props.rejectInvitation(this.props.notification._id);
        this.toggle();
    }
    render() {
        return (
            <a className="dropdown-item p-0">
                <div className="w-100 border-bottom px-2 py-2" onClick={this.toggle}>
                    <i className="fas fa-folder mx-1"></i><strong>Project Invitation</strong>
                    <p className="m-0 text-right">
                        <small>by {this.props.notification.senderId.name}</small>
                    </p>
                </div>
                <Modal centered isOpen={this.state.open} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        <h4 className="mb-0">Project Invitation</h4>
                    </ModalHeader>
                    <ModalBody>
                        <p>
                            You have been invited by <strong>{this.props.notification.senderId.name} </strong>
                            to contribute on <strong>{this.props.notification.projectId.name}</strong>.
                        </p> 
                        <Button size="sm" className="mr-2" color="primary" onClick={this.handleAcceptInvitation}>Accept</Button>
                        <Button size="sm" color="danger" onClick={this.handleRejectInvitation}>Reject</Button>
                    </ModalBody>
                </Modal>
            </a>
        )
    }
}

const mapDispathToprops = (dispatch) => ({
    acceptInvitation: (id) => dispatch({type: 'ACCEPT_INVITATION', id}),
    rejectInvitation: (id) => dispatch({type: 'REJECT_INVITATION', id})
})

export default connect(null, mapDispathToprops)(MemberNotification);
