import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Button} from 'reactstrap';
import { connect } from 'react-redux';
import FileUpload from './FileUpload';
import Dataset from '../../api/Dataset';

class FileUploadModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            name: ""
        }
    }

    toggle = () => {
        this.setState({files: [], name: ""});
        this.props.toggle();
    }

    handleFilesInput = (files) => {
        this.setState({files: files});
    }

    handleNameInput = (e) => {
        this.setState({name: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createDatasetWithImages(this.state.files, this.state.name)
        this.toggle();
    }

    render() {
        return (
            <Modal isOpen={this.props.modelOpen} centered toggle={this.toggle} className={"w-100"}>
                <ModalHeader toggle={this.toggle}>Add data source</ModalHeader>
                <ModalBody>
                    {
                        this.state.files.length === 0
                        ? 
                            <FileUpload handleFilesInput={this.handleFilesInput} />
                        :
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Input type="text" placeholder="Dataset Name" value={this.state.name} onChange={this.handleNameInput} />
                                </FormGroup>
                                <Button type="submit" color="primary">Add Dataset</Button>
                            </Form>
                    }
                </ModalBody>
            </Modal>
        )
    }
}

const mapDispatchToProp = (dispatch) => ({
    createDatasetWithImages: (images, name) => dispatch({type: 'CREATE_DATASET_WITH_IMAGES', images, name})
})

export default connect(null, mapDispatchToProp)(FileUploadModal);