import React, {Component} from 'react';
// import {Container} from "react-bootstrap";
import ReadImage from './ReadImage';
import { Container } from 'reactstrap';

class ImageSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seleted: -1
        }
    }

    handleClick = (idx) => {
        this.setState({seleted: idx});
        this.props.onSelect(idx);
    }

    render() {
        return (
            <Container className="d-flex mt-3 flex-wrap" style={{height:50}}>
                {
                    this.props.images.map((image, i) => <ReadImage image={image} active={i==this.state.seleted}  onClick={() => this.handleClick(i)} onComplete={(image)=>{this.props.onComplete(i, image)}}/>)
                }
            </Container>
        )
    }
}

export default ImageSelector;