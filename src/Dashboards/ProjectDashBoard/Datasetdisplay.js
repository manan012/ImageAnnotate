import React, { Component, Fragment } from 'react';
import {Container, Button, Table, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { connect } from 'react-redux';
import FileUpload from './FileUpload';

class DatasetDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            addImageModelOpen: false,
        }
    }

    componentWillMount() {
        this.props.fetchDataset(this.props.match.params.datasetId);
    }

    toggleAddImageModel = () => this.setState({addImageModelOpen: !this.state.addImageModelOpen});

    toggleAllSelect = () => {
        console.log("called");
        if (this.state.selected.length === this.props.dataset.images.length) {
            this.setState({selected: []});
        } else {
            this.setState({
                selected: this.props.dataset.images.map(img => img._id),
            })
        }
    };

    select = (id) => {
        const isSelected = this.state.selected.filter(idx => idx === id).length > 0
        if (isSelected) {
            this.setState({selected: this.state.selected.filter(idx => idx !== id)});
        } else {
            this.setState({selected: [...this.state.selected, id]});
        }
    }

    deleteImages = () => this.props.deleteImages(
        this.props.match.params.datasetId,
        this.state.selected
    )

    handleFileUpload = (files) => {
        this.props.uploadImages(this.props.match.params.datasetId, files)
        this.toggleAddImageModel();
    }

    render() {
        return (
            this.props.dataset.status=== "FETCH_DATASET_SUCCESS" ?
                <Container>
                    <div className="d-flex justify-content-end py-3">
                        {
                            this.state.selected.length > 0 && 
                            <Button color="basic" onClick={this.deleteImages} className="mr-2 text-danger outline-none">Delete</Button>
                        }
                        <Button color="primary" onClick={this.toggleAddImageModel} className="">Add dataset</Button>
                    </div>
                    <Table borderless className="border">
                        <thead className="border-bottom">
                            <tr className="">
                                <th className="">
                                    <div style={{width: 40, height: 20}} className="text-center">
                                        <Input type="checkbox" className=""
                                                onClick={this.toggleAllSelect}
                                                checked={this.state.selected.length === this.props.dataset.images.length} />
                                    </div>
                                </th>
                                <th>Name</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.dataset.images.map(img => (
                                <tr className="border-bottom">
                                    <td>
                                        <div style={{width: 40, height: 20}} className="text-center">
                                            <Input type="checkbox" className="" 
                                                onClick={() => this.select(img._id)}
                                                checked={this.state.selected.filter(id => id === img._id ).length > 0}/>
                                        </div>
                                    </td>
                                    <td className="text-dark">{img.imageName}</td>
                                    <td>
                                        <a href={'http://localhost:5000/public/'+img.location} target="_blank">{'http://localhost:5000/public/'+img.location}</a>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                    <Modal isOpen={this.state.addImageModelOpen} centered toggle={this.toggleAddImageModel} className={'center'}>
                    <ModalHeader toggle={this.props.toggle}>Add Dataset</ModalHeader>
                        <ModalBody>
                            <FileUpload handleFilesInput={this.handleFileUpload}/>
                        </ModalBody>
                    </Modal>
                </Container>
            :null
        )
    }
}

const matchStateToProp = (state) => ({
    dataset: state.datasets.dataset
})

const matchDispatchToProp = (dispatch) => ({
    fetchDataset: (id) => dispatch({type: 'FETCH_DATASET', id}),
    deleteImages: (datasetId, imagesIds) => dispatch({type: 'DELETE_IMAGES', datasetId, imagesIds}),
    uploadImages: (datasetId, images) => dispatch({type: 'UPLOAD_IMAGES', datasetId, images})
})

export default connect(matchStateToProp, matchDispatchToProp)(DatasetDisplay);