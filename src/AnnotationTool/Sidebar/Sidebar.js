import React, { Component } from "react";
import "./Sidebar.css";
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.css";

// This file has 2 main functions
//  1. It lets up upload file from the user's device (Code line: 22-36)
//  2. It lets you download JSON file to the user's device containing annotation details (Code line: 40-67 )

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dta: "",
      imageFile: "",
      varx: false,
      rectangles: [],
    };
  }

  //Add new images to read
  newImages = (e) => {
    const images = [...e.target.files]
      .filter((imageFile) => imageFile.type.split("/")[0] === "image")
      .map((imageFile) => ({
        file: imageFile,
        readed: 0,
        image: "",
        annotations: { rectangles: [], circles: [], polygons: [], lines: [] },
      }));
    this.props.addImages(images);
  };

  // Downloading the Json File
  DataSend() {
    this.props.saveAnnotationsAsJson();
  }

  render() {
    return (
      <div className="">
        <div>
          <label
            htmlFor="file"
            className="submitButton"
            title="Select File to Upload"
          >
            <i className="fas fa-file-upload fa-3x"></i>
          </label>
          <input
            id="file"
            accept="image/*"
            hidden="hidden"
            type="file"
            onChange={this.newImages}
          />
        </div>
        <div>
          <label
            htmlFor="files"
            className="submitButton"
            title="Select File to Upload"
          >
            <i class="fas fa-folder-open fa-3x"></i>
          </label>
          <input
            id="files"
            accept="image/*"
            hidden="hidden"
            type="file"
            webkitdirectory=""
            directory=""
            onChange={this.newImages}
          />
        </div>
        <div>
          <button
            className="submitButton"
            title="Draw Rectangle"
            onClick={() => {
              this.props.anotateSeletedImage();
            }}
          >
            <i className="fas fa-pencil-ruler fa-3x"></i>
          </button>
        </div>
        <div>
          <button
            className="submitButton"
            title="Draw Rectangle"
            onClick={() => {
              this.props.setDrawingMode('rectangle');
            }}
          >
            <i className="fas fa-vector-square fa-3x"></i>
          </button>
        </div>
        <div>
          <button
            className="submitButton"
            title="Draw Circle"
            onClick={() => {
              this.props.setDrawingMode('circle');
            }}
          >
            <i className="far fa-circle fa-3x"></i>
          </button>
        </div>
        <div>
          <button
            className="submitButton"
            title="Delete Shape"
            onClick={() => {
              this.props.setDrawingMode('delete');
            }}
          >
            <i class="fas fa-minus-circle fa-3x"></i>
          </button>
        </div>
        <div>
          <button
            className="submitButton"
            title="Draw Line"
            onClick={() => {
              this.props.setDrawingMode('line');
            }}
          >
            <i className="fas fa-pen fa-3x"></i>
          </button>
        </div>
        <div>
          <button
            className="submitButton"
            title="Draw Polygon"
            onClick={() => {
              this.props.setDrawingMode('polygon');
            }}
          >
            <i className="fas fa-draw-polygon fa-3x"></i>
          </button>
        </div>
        <div>
          <button
            className="submitButton"
            title="Save JSON"
            onClick={() => this.DataSend()}
          >
            <i className="fas fa-download fa-3x"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Sidebar;
