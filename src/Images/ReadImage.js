import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay } from "reactstrap";
import detectObject from "../utils/objectDetection";

class ReadImage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.image };
  }

  componentWillMount = () => {
    if (this.state.readed != 0) return;
    this.fileReader = new FileReader();
    this.fileReader.addEventListener("progress", this.progess);
    this.fileReader.addEventListener("load", this.completed);
    this.fileReader.readAsDataURL(this.state.file);
  };

  progess = (progressEvent) => {
    this.setState({
      readed: (progressEvent.loaded / progressEvent.total) * 100,
    });
  };

  completed = () => {
    this.setState({
      readed: 100,
      image: this.fileReader.result,
    });
    const img = document.createElement('img');
    img.src=this.fileReader.result;
    img.onload = () => {
      const height = img.height;
      const width = img.width;
      const drawingAreaHeight = this.props.drawingAreaHeight;
      const drawingAreaWidth = this.props.drawingAreaWidth;
      const commScale = Math.max(
        (width <= drawingAreaWidth ? 1 : drawingAreaWidth/width),
        (height <= drawingAreaHeight ? 1 : drawingAreaHeight/height)
      )
      console.log(drawingAreaHeight, drawingAreaWidth);
      this.props.onComplete({
        ...this.state,
        readed:100, 
        height: height, 
        width: width, 
        scaleX: commScale,
        scaleY: commScale,
        image: this.fileReader.result
      });
    }
  };

  render() {
    return (
      <Card
        className={"mx-1 my-1 " + (this.props.active ? "active" : "")}
        onClick={this.props.onClick}
      >
        <CardImg
          style={{ width: "70px" }}
          src={this.state.readed != 100 ? "./img/images.jpg" : this.state.image}
          alt={this.state.file.name}
        />
        <CardImgOverlay style={{ width: "70px" }} className="p-0 d-flex justify-content-center align-items-center">
          <small className="text-muted">{this.state.readed} %</small>
        </CardImgOverlay>
      </Card>
    );
  }
}

export default ReadImage;
