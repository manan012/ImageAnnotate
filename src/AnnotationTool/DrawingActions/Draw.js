import React, { Component } from 'react';
import { Layer } from 'react-konva';
import Delete from './Delete';

class Draw extends Component {
    constructor(props) {
        super(props);
    }
    getComponent = () => {
    }
    render() {
        return <Delete />
    }
}

export default Draw;