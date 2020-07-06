import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import List from '../List';
import ListItem from '../ListItem';

class AddDatasetTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <div className="py-3">
                    <Button color="primary" className="d-block ml-auto">Add dataset</Button>
                </div>
                <List>
                    <ListItem title={'Cars'} infos={['17 rows'] } />
                </List>
            </Fragment>
        )
    }
}

export default AddDatasetTab;