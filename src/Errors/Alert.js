import React, { Component } from 'react'
import { Alert } from 'reactstrap';
import { prop } from 'ramda';

export class CustomAlert extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: true
        }
    }
    remove = () => {
        this.setState({visible: false})
        this.props.remove();
    }
    componentDidMount() {
        this.interval = setInterval(this.remove, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <Alert color="danger" isOpen={this.state.visible} toggle={this.remove}>{this.props.error}</Alert>
        )
    }
}

export default CustomAlert
