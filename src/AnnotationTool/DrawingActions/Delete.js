import React, { Component } from 'react';
import { Layer } from 'react-konva';

class Delete extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return <Layer onMouseDown={(e) => console.log(e)} />
    }
}

export default Delete;