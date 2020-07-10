import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import List from '../List';
import ListItem from '../ListItem';
import FileUploadModal from './FileUploadModal';
import Dataset from '../../api/Dataset';
import { connect } from 'react-redux';

class AddDatasetTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileUploadModalOpen: false,
        }
    }

    componentWillMount = () => {
        this.props.fetchDatasets();
    }

    fileUploadModalToggle = () => this.setState(state => ({fileUploadModalOpen: !state.fileUploadModalOpen}))
    render() {
        return (
            <Fragment>
                <div className="py-3">
                    <Button color="primary" onClick={this.fileUploadModalToggle} className="d-block ml-auto">Add dataset</Button>
                </div>
                <List>
                    {
                        this.props.datasets.map(dataset => (
                                <ListItem key={dataset._id} 
                                          title={dataset.datasetName} 
                                          to={"/dataset/"+dataset._id} 
                                          infos={[(dataset.images.length + ' rows')] }
                                          onDelete={() => this.props.deleteDataset(dataset._id)} />
                            )
                        )
                    }
                </List>
                <FileUploadModal modelOpen={this.state.fileUploadModalOpen} toggle={this.fileUploadModalToggle} />
            </Fragment>
        )
    }
}

const matchStateToProps = ({datasets: state}) => ({
    datasets: state.datasets
})

const matchDispatchToProps = (dispatch) => ({
    fetchDatasets: () => dispatch({type: 'FETCH_DATASETS'}),
    deleteDataset: (id) => dispatch({type:'DELETE_DATASET', id: id})
})

export default connect(matchStateToProps, matchDispatchToProps)(AddDatasetTab);