import React, { Component } from "react";

class ImageComponent extends Component {
  render() {
    return (
      <div>
        <img
          class="image_annotation_class"
          src={this.props.image_src}
          width="600px"
          height="452px"
        ></img>
      </div>
    );
  }
}

export default ImageComponent;
