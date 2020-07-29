import React, { Component } from "react";
import "./Sidebar.css";
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  DataSend() {
    this.props.saveAnnotationsAsJson();
  }

  render() {
    return (
      <div className="">
        <div>
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
        <div>
          <button
            className="submitButton"
            title="Save XML"
            onClick={() => this.props.saveAnnotationsAsXML()}
          >
            <i className="fas fa-download fa-3x"></i>
          </button>
        </div>
      </div>
    );
  }
} 

export default Sidebar;
