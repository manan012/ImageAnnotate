import React, { Component } from "react";
import "./Sidebar.css";
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import { connect } from "react-redux";
import DatasetListOverview from "../../Dashboards/OverviewDashBoard/DatasetListOverview";
import { flatten } from "ramda";
import { baseURL } from "../../config";

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

  componentWillMount() {
    // this.props.images.map(img => {
    //   var xhr = new XMLHttpRequest();
    //   xhr.open('GET', publicURL + img.location);
    //   xhr.responseType = "blob";
    //   xhr.onload = () => {
    //     var blob = xhr.response;
    //     this.props.addImages([{
    //       file: blob,
    //       name: img.imageName,
    //       readed: 0,
    //       image: "",
    //       annotations: { rectangles: [], circles: [], polygons: [], lines: [] },
    //     }])
    //   }
    //   xhr.send();
    // });
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
          {/* <label
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
          /> */}
          <div className="submitButton" onClick={this.props.selectPrev}>
            <i class="fas fa-long-arrow-alt-left fa-3x"></i>
          </div>
        </div>
        <div>
          <div className="submitButton" onClick={this.props.selectNext}>
            <i class="fas fa-long-arrow-alt-right fa-3x"></i>
          </div>
        </div>
        <div>
          <button
              className={"submitButton " + (this.props.drawingMode === 'zoomIn' ? 'active' : "")}
              title="Zoom In"
              onClick={() => {
                this.props.setDrawingMode('zoomIn');
              }}
            >
              <i class="fas fa-search-plus fa-3x"></i>
          </button>
        </div>
        <div>
          <button
              className={"submitButton " + (this.props.drawingMode === 'zoomOut' ? 'active' : "")}
              title="Zoom Out"
              onClick={() => {
                this.props.setDrawingMode('zoomOut');
              }}
            >
              <i class="fas fa-search-minus fa-3x"></i>
          </button>
        </div>
        {/* <div>
          <label
            htmlFor="files"
            className="submitButton"
            title="Select Folder to Upload"
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
        </div> */}
        <div>
          <button
            className="submitButton"
            title="Auto Annotate"
            onClick={() => {
              this.props.anotateSeletedImage();
            }}
          >
            <i className="fas fa-pencil-ruler fa-3x"></i>
          </button>
        </div>
        <div>
          <button
            className={"submitButton " + (this.props.drawingMode === 'line' ? 'active' : "")}
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
            className={"submitButton " + (this.props.drawingMode === 'circle' ? 'active' : "")}
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
            className={"submitButton " + (this.props.drawingMode === '' ? 'active' : "")}
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
            className={"submitButton " + (this.props.drawingMode === 'polygon' ? 'active' : "")}
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
            className={"submitButton " + (this.props.drawingMode === 'delete' ? 'active' : "")}
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
