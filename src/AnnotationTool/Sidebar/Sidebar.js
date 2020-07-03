import React, { Component } from "react";
import "./Sidebar.css";
import axios from "axios";
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
        annotations: { rectangles: [], circles: [], polygons: [] },
      }));
    this.props.addImages(images);
  };

  // Downloading the Json File
  DataSend() {
    //this.state.rectangles=this.props.rectangles;
    this.props.saveAnnotationsAsJson();
    // this.setState({ dta: data });
    // if (this.state.varx) {
    //   //console.log('hello');
    //   axios
    //     .post("https://labell.herokuapp.com/api/generate", data)
    //     .then(console.log("data send!"))
    //     .then(
    //       axios({
    //         url: "https://labell.herokuapp.com/api/getfile",
    //         method: "GET",
    //         responseType: "blob",
    //       })
    //         .then((response) => {
    //           console.log(response.data);
    //           const url = window.URL.createObjectURL(new Blob([response.data]));
    //           const link = document.createElement("a");
    //           link.href = url;
    //           link.setAttribute("download", "file.json"); //or any other extension
    //           document.body.appendChild(link);
    //           link.click();
    //         })
    //         .catch((err) => {
    //           console.log("error1", err);
    //         })
    //     )
    //     .catch((err) => {
    //       console.log("error2", err);
    //     });
    // }
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
              this.props.buttonClick(true, false, false, false, false);
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
              this.props.buttonClick(false, true, false, false, false);
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
              this.props.buttonClick(false, false, true, false, false);
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
              this.props.buttonClick(false, false, false, true, false);
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
