import React, { Component } from "react";
// import {Container} from "react-bootstrap";
import ReadImage from "./ReadImage";
import { Container, Button } from "reactstrap";
import Pq from "p-queue";

class ImageSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seleted: -1,
      objectDetectionQueue: new Pq({concurrency:1})
    };
  }

  componentDidUpdate = () => {
    if (this.props.images && this.props.images.length > 0 && this.state.seleted == -1) {
      this.setState({seleted: 0})
      this.props.onSelect(0);
    }
  }

  handleClick = (idx) => {
    this.setState({ seleted: idx });
    this.props.onSelect(idx);
  };

  moveForward = () => {
    this.props.onSelect(this.state.seleted+1);
    this.setState({seleted: this.state.seleted+1});
  }

  moveBackward = () => {
    this.props.onSelect(this.state.seleted-1);
    this.setState({seleted: this.state.seleted-1});
  }

  addObjectDetectionTaskToQueue = (task) => {
    this.state.objectDetectionQueue.add(task);
  }

  render() {
    return (
      <Container className="d-flex align-items-center">
        <div className="mr-2">
          <Button disabled={this.state.seleted <= 0} onClick={this.moveBackward}><i class="fas fa-long-arrow-alt-left"></i></Button>
        </div>
        <div style={{minWidth: "80%", minHeight: "60px"}} className="overflow-hidden p-0 border m-0">
          <div style={{transform:`translate(${-this.state.seleted*(75 + 2*4)}px, 0px)`}} className="img-sel-inner-container p-0 position-aboslute">
            {this.props.images.map((image, i) => (
              <ReadImage
                image={image}
                active={i == this.state.seleted}
                onClick={() => this.handleClick(i)}
                addObjectDetectionTaskToQueue={this.addObjectDetectionTaskToQueue}
                drawingAreaWidth={this.props.drawingAreaWidth}
                drawingAreaHeight={this.props.drawingAreaHeight}
                onComplete={(image) => {
                  this.props.onComplete(i, image);
                }}
              />
            ))}
          </div>
        </div>
        <div className="ml-2">
        <Button disabled={this.state.seleted == this.props.images.length-1} onClick={this.moveForward}><i class="fas fa-long-arrow-alt-right"></i></Button>
        </div>
      </Container>
    );
  }
}

export default ImageSelector;
