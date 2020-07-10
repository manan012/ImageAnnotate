import React from 'react';
import { Component } from 'react';
import { Button } from 'reactstrap';

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drag: false
        }
    }

    handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }
    handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter++
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({drag: true})
        }
    }
    handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter--
        if (this.dragCounter === 0) {
            this.setState({drag: false})
        }
    }
    handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({drag: false})
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.props.handleFilesInput(e.dataTransfer.files);
            e.dataTransfer.clearData()
            this.dragCounter = 0    
        }
    }

    handleFilesInput = (e) => {
        this.props.handleFilesInput(e.target.files);
    }

    render() {
        return (
            <div className="p-1">
                <label className="w-100 border" htmlFor="files">
                    <div className="text-center py-5" 
                    onDragEnter={this.handleDragIn} 
                    onDragLeave={this.handleDragOut} 
                    onDragOver={this.handleDrag} 
                    onDrop={this.handleDrop}>
                        <div className="text-center"><i class="fas fa-cloud-upload-alt fa-2x"></i></div>
                        <p>Drop Image files to upload.</p>
                        <input onChange={this.handleFilesInput} type="file" multiple className="d-none" id="files" />
                        <Button color="primary p-0">
                            <label className="mb-0 w-100 py-1 px-2" htmlFor="files">
                                Choose files to upload
                            </label>
                        </Button>
                    </div>
                </label>
            </div>
        )
    }
}

export default FileUpload