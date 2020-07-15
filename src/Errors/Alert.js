import React, { Component } from 'react'
import { Alert } from 'reactstrap';

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
            <Alert className="position-relative bg-grey border-0" color="dark" isOpen={this.state.visible} toggle={this.remove}>
                {this.props.error}
                <div className="position-absolute bg-danger" style={{width: 5, height: '100%', top: 0, right: 0}}></div>
            </Alert>
        )
    }
}

export default CustomAlert
