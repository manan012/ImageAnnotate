import React from "react";
import { Image } from "react-konva";
const tf = require("@tensorflow/tfjs");
const cocoSsd = require("@tensorflow-models/coco-ssd");

class AnnotationImage extends React.Component {
  state = {
    image: "",
    zoomed_in: true,
  };

  async componentDidUpdate() {
    const image = new window.Image();
    image.src = this.props.image;
    image.onload = () => {
      this.setState({
        image,
      });
    };
  }

  handleMouseOver = (event) => {
    const image = event.target;
    image.getStage().container().style.cursor = "move";
  };

  handleMouseOut = (event) => {
    const image = event.target;
    image.getStage().container().style.cursor = "crosshair";
  };

  handleMouseDown = (event) => {
    const { zoomed_in } = this.state;
    const image = event.target;
    const stage = image.getStage();
    image.getStage().container().style.cursor = "default";
    var pos = stage.getPointerPosition();

    if (
      zoomed_in == false &&
      this.props.circle === false &&
      this.props.rector === false
    ) {
      stage.x(-pos.x);
      stage.y(-pos.y);
      stage.scale({
        x: 2,
        y: 2,
      });
      stage.getLayers().draw();

      this.setState({ zoomed_in: true });
    } else if (zoomed_in == true) {
      stage.x(0);
      stage.y(0);
      stage.scale({
        x: 1,
        y: 1,
      });
      stage.getLayers().draw();
      this.setState({ zoomed_in: false });
    }
  };

  handleMouseUp = (event) => {
    const image = event.target;
    image.getStage().container().style.cursor = "move";
  };

  render() {
    const {
      handleMouseOver,
      handleMouseOut,
      handleMouseDown,
      handleMouseUp,
    } = this;
    console.log("anotate");
    return (
      <Image
        image={this.state.image}
        width={window.innerWidth * 0.763}
        height={window.innerHeight * 0.88}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    );
  }
}

export default AnnotationImage;
