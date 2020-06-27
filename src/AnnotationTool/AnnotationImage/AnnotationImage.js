import React from "react";
import { Image } from "react-konva";

class AnnotationImage extends React.Component {
  state = {
    image: "",
    zoomed_in: true,
  };

  componentDidUpdate() {
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
    const layer = image.getLayer();
    const stage = image.getStage();
    console.log("Layer = " + layer);
    image.getStage().container().style.cursor = "default";
    var pos = stage.getPointerPosition();

    if (
      zoomed_in == false &&
      this.props.circle === false &&
      this.props.rector === false
    ) {
      layer.x(-pos.x);
      layer.y(-pos.y);
      layer.scale({
        x: 2,
        y: 2,
      });
      this.setState({ zoomed_in: true });
    } else if (zoomed_in == true) {
      layer.x(0);
      layer.y(0);
      layer.scale({
        x: 1,
        y: 1,
      });
      this.setState({ zoomed_in: false });
    }
    // this.rect.draw();
    // this.rect.getLayer().draw();
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
