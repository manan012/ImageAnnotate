import React from "react";
import { Stage, Layer } from "react-konva";
import AnnotationImage from "./AnnotationImage/AnnotationImage";
import "./Main.css";
import Sidebar from "./Sidebar/Sidebar";
import DrawRect from "./Rectangle/DrawRect";
import { Button } from "reactstrap";
import DrawCircle from "./Circle/DrawCircle";
import { useHistory } from "react-router-dom";
import ReadImage from "../Images/ReadImage";
import ImageSelector from "../Images/ImageSelector";
import { omit } from "ramda";

//  This is the main page for Image Annotation.
//  It has a Sidebar component which has buttons which serves different purposes
//  It has a Canvas built on Konva.js for Image
//  It has a Annotation bar which have Input field for Annoting the image

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedImage: undefined,
      image: "",
      stageWidth: 1000,
      mouseDown: false,
      rector: false,
      circle: false,
      line: false,
      polygon: false,
      point: false,
      rectangles: [],
      circles: [],
    };
    this.handleInputValueRect = this.handleInputValueRect.bind(this);
    this.handleInputValueCirc = this.handleInputValueCirc.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextState);
  }

  addImages = (newImages) => {
    this.setState((state) => ({ images: [...state.images, ...newImages] }));
  };

  updateImage = (idx, updatedImages) => {
    this.setState({
      images: this.state.images.map((image, i) =>
        i === idx ? updatedImages : image
      ),
    });
  };

  selectImage = (idx) => {
    if (this.state.selectedImage == undefined) {
      this.setState({ selectedImage: { idx: idx, ...this.state.images[idx] } });
      return;
    }
    if (this.state.selectedImage.idx === idx) return;
    this.setState({
      images: this.state.images.map((img, i) =>
        i === this.state.selectedImage.idx
          ? omit(["idx"], this.state.selectedImage)
          : img
      ),
      selectedImage: { idx: idx, ...this.state.images[idx] },
    });
  };

  addCircle = (newCircle) => {
    this.setState((state) => {
      return {
        selectedImage: {
          ...state.selectedImage,
          annotations: {
            ...state.selectedImage.annotations,
            circles: [...state.selectedImage.annotations.circles, newCircle],
          },
        },
      };
    });
  };

  updateCircle = (idx, newCircleProps) => {
    this.setState((state) => ({
      selectedImage: {
        ...state.selectedImage,
        annotations: {
          ...state.selectedImage.annotations,
          circles: state.selectedImage.annotations.circles.map((circle, i) =>
            i == idx ? { ...circle, ...newCircleProps } : circle
          ),
        },
      },
    }));
  };

  addRectangle = (newRectangle) => {
    this.setState((state) => {
      return {
        selectedImage: {
          ...state.selectedImage,
          annotations: {
            ...state.selectedImage.annotations,
            rectangles: [
              ...state.selectedImage.annotations.rectangles,
              newRectangle,
            ],
          },
        },
      };
    });
  };

  updateRectangle = (idx, newRectangleProps) => {
    this.setState((state) => ({
      selectedImage: {
        ...state.selectedImage,
        annotations: {
          ...state.selectedImage.annotations,
          rectangles: state.selectedImage.annotations.rectangles.map(
            (rectangle, i) =>
              i == idx ? { ...rectangle, ...newRectangleProps } : rectangle
          ),
        },
      },
    }));
  };

  //Signout Button Action
  handleSubmit(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  //When a new rectangle is added
  handleInputValueRect(val) {
    if (this.state.selectedImage === undefined) return;
    this.setState((state) => ({
      selectedImage: {
        ...this.state.selectedImage,
        annotations: {
          ...this.state.selectedImage.annotations,
          rectangles: val,
        },
      },
    }));
  }

  // When a circle is added
  handleInputValueCirc(val) {
    console.log(val);
    if (this.state.selectedImage === undefined) return;
    this.setState((state) => ({
      selectedImage: {
        ...this.state.selectedImage,
        annotations: { ...this.state.selectedImage.annotations, circles: val },
      },
    }));
  }

  //Setting background image
  imageSet = (file) => {
    this.setState({ image: file });
  };

  // Calling child functions inside parent
  handleNewShapeChange = (event) => {
    //For rectangle
    if (this.state.rector) {
      this.refs.child1.handleNewRectChange(event);
    }

    //For Circle
    else if (this.state.circle) {
      this.refs.child.handleNewCircleChange(event);
    }
  };

  // When mouse key is released up
  handleStageMouseUp = () => {
    //For Rectangle
    if (this.state.rector) {
      this.refs.child1.handleStageMouseUp();
      this.setState({ mouseDown: this.refs.child1.state.mouseDown });
    }

    //For Circle
    else if (this.state.circle) {
      this.refs.child.handleStageMouseUp();
      this.setState({ mouseDown: this.refs.child.state.mouseDown });
    }
  };

  // When mouse key is pressed down
  handleStageMouseDown = (event) => {
    //For rectangle
    if (this.state.rector) {
      this.refs.child1.handleStageMouseDown(event);
      this.setState({ mouseDown: this.refs.child1.state.mouseDown });
    }

    //For Circle
    else if (this.state.circle) {
      this.refs.child.handleStageMouseDown(event);
      this.setState({ mouseDown: this.refs.child.state.mouseDown });
    }
  };

  //To resize the canvasdynamically
  componentDidMount() {
    this.checkSize();
    window.addEventListener("resize", this.checkSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkSize);
  }

  checkSize = () => {
    this.setState({
      stageWidth: window.innerWidth * 0.764,
    });
  };

  //Setting the buttons
  buttonClick = (rector, circle, line, polygon, point) => {
    this.setState({ rector, circle, line, polygon, point });
  };

  render() {
    const {
      state: { mouseDown },
      handleNewShapeChange,
      handleStageMouseDown,
      handleStageMouseUp,
    } = this;

    return (
      <div className="whole">
        <div className="row">
          <div className="col-12">
            <ImageSelector
              images={this.state.images}
              onComplete={(idx, image) => this.updateImage(idx, image)}
              onSelect={(idx) => this.selectImage(idx)}
            />
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-8 name" style={{ color: "#08c751" }}>
            <h1>
              <b>Image Annotator</b>
            </h1>
          </div>
          <div className="col-md-2 name1">
            <Button color="primary" type="submit" onClick={this.handleSubmit}>
              Log out
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="sm spa">
            <Sidebar
              buttonClick={this.buttonClick}
              imageSet={this.imageSet}
              rectangles={this.state.rectangles}
              circles={this.state.circles}
              addImages={this.addImages}
            />
          </div>
          <div id="app" className="col-md-9">
            <Stage
              ref={(node) => {
                this.stage = node;
              }}
              container="app"
              width={this.state.stageWidth}
              height={window.innerHeight * 0.88}
              onMouseDown={handleStageMouseDown}
              onTouchStart={handleStageMouseDown}
              onMouseMove={mouseDown && handleNewShapeChange}
              onTouchMove={mouseDown && handleNewShapeChange}
              onMouseUp={mouseDown && handleStageMouseUp}
              onTouchEnd={mouseDown && handleStageMouseUp}
            >
              <Layer
                ref={(node) => {
                  this.img = node;
                }}
              >
                <AnnotationImage
                  image={
                    this.state.selectedImage
                      ? this.state.selectedImage.image
                      : ""
                  }
                  rector={this.state.rector}
                  circle={this.state.circle}
                />
              </Layer>

              <Layer>
                <DrawCircle
                  ref="child"
                  circles={
                    this.state.selectedImage
                      ? this.state.selectedImage.annotations.circles
                      : []
                  }
                  addCircle={(newCircle) => this.addCircle(newCircle)}
                  updateCircle={this.updateCircle}
                  handleInput={this.handleInputValueCirc}
                />
                <DrawRect
                  ref="child1"
                  rectangles={
                    this.state.selectedImage
                      ? this.state.selectedImage.annotations.rectangles
                      : []
                  }
                  addRectangle={this.addRectangle}
                  updateRectangle={this.updateRectangle}
                  handleInput={this.handleInputValueRect}
                />
              </Layer>
            </Stage>
          </div>
          <div className="col-md-2" id="annotate">
            <div className="row ann">
              <h4>Annotations</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
