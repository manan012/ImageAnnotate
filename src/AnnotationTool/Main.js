import React from "react";
import { Stage, Layer } from "react-konva";
import AnnotationImage from "./AnnotationImage/AnnotationImage";
import "./Main.css";
import Sidebar from "./Sidebar/Sidebar";
import DrawRect from "./Rectangle/DrawRect";
import { Button } from "reactstrap";
import DrawCircle from "./Circle/DrawCircle";
import ImageSelector from "../Images/ImageSelector";
import { Container, Row, Col } from "reactstrap";
import NameAnnotations from "./Names/NameAnnotations";
import { omit } from "ramda";
import GoogleDrive from "../GoogleDrive/GoogleDrive";
import detectObject from "../utils/objectDetection";
import saveObjectAsJSONFfile from "../utils/saveObjectAsJSONFile";

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
      stageWidth: 1000,
      mouseDown: false,
      rector: false,
      circle: false,
      drawingAreaWidth: 0,
      drawingAreaHeight: 0,
      line: false,
      polygon: false,
      point: false,
    };
    this.handleInputValueRect = this.handleInputValueRect.bind(this);
    this.handleInputValueCirc = this.handleInputValueCirc.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(this.state);
  }

  componentDidMount = () => {
    this.setState({
      drawingAreaHeight: this.drawingArea.getBoundingClientRect().height,
      drawingAreaWidth: this.drawingArea.getBoundingClientRect().width,
    });
    window.addEventListener("resize", this.updateDrawingAreaSize);
    window.addEventListener("resize", this.correctScaleOfSelectedImage);
  };

  updateDrawingAreaSize = () => {
    this.setState({
      drawingAreaHeight: this.drawingArea.getBoundingClientRect().height,
      drawingAreaWidth: this.drawingArea.getBoundingClientRect().width,
    });
  };

  addImages = (newImages) => {
    this.setState((state) => ({ images: [...state.images, ...newImages] }));
  };

  updateImage = (idx, updatedImages) => {
    console.log(updatedImages);
    if (this.state.selectedImage && this.state.selectedImage.idx === idx) {
      this.setState({
        selectedImage: {
          idx: idx,
          ...this.state.images[idx],
          ...updatedImages,
        },
      });
      return;
    }
    this.setState({
      images: this.state.images.map((image, i) =>
        i === idx ? updatedImages : image
      ),
    });
  };

  selectImage = (idx) => {
    if (this.state.selectedImage && this.state.selectedImage.idx === idx)
      return;
    if (this.state.selectedImage == undefined) {
      this.setState({ selectedImage: { idx: idx, ...this.state.images[idx] } });
      return;
    }
    this.setState({
      images: this.state.images.map((img, i) =>
        i === this.state.selectedImage.idx
          ? omit(["idx"], this.state.selectedImage)
          : img
      ),
      selectedImage: { idx: idx, ...this.state.images[idx] },
    });
  };

  correctScaleOfSelectedImage = () => {
    if (!this.state.selectedImage) return;
    const height = this.state.selectedImage.height;
    const width = this.state.selectedImage.width;
    const drawingAreaHeight = this.state.drawingAreaHeight;
    const drawingAreaWidth = this.state.drawingAreaWidth;
    const commScale = Math.max(
      drawingAreaHeight / height,
      drawingAreaWidth / width
    );
    this.setState({
      ...this.state,
      selectedImage: {
        ...this.state.selectedImage,
        scaleX: commScale,
        scaleY: commScale,
      },
    });
  };

  anotateSeletedImage = () => {
    if (!this.state.selectedImage) return;
    (async (selectedImage) => {
      detectObject(selectedImage.image).then((newRectangles) => {
        console.log(newRectangles);
        this.updateImage(selectedImage.idx, {
          ...omit(["idx"], selectedImage),
          annotations: {
            ...selectedImage.annotations,
            rectangles: [
              ...selectedImage.annotations.rectangles,
              ...newRectangles,
            ],
          },
        });
      });
      console.log(selectedImage);
    })(this.state.selectedImage);
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

  saveAnnotationsAsJson = () => {
    const data = {};
    this.state.images.map(img => {
      data[img.file.name] = img.annotations;
    })
    if (this.state.selectedImage) {
      data[this.state.selectedImage.file.name] = this.state.selectedImage.annotations;
    }
    saveObjectAsJSONFfile(data, 'annotations');
  }

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
    if (this.state.selectedImage === undefined) return;
    this.setState((state) => ({
      selectedImage: {
        ...this.state.selectedImage,
        annotations: { ...this.state.selectedImage.annotations, circles: val },
      },
    }));
  }

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
    if (!this.state.selectedImage) return;
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
      <Container fuild>
        <Row className="border-bottom">
          <div className="col-md-2 "></div>
          <div className="col-md-8 name " style={{ color: "#08c751" }}>
            <h1>
              <b>Image Annotator</b>
            </h1>
          </div>
          {/* <div className="col-md-2 name1">
            <Button color="primary" type="submit" onClick={this.handleSubmit}>
              Log out
            </Button>
          </div> */}
          <Col xs={12} className={"py-2"}>
            <ImageSelector
              images={this.state.images}
              onComplete={(idx, image) => this.updateImage(idx, image)}
              onSelect={(idx) => this.selectImage(idx)}
              drawingAreaWidth={this.state.drawingAreaWidth}
              drawingAreaHeight={this.state.drawingAreaHeight}
            />
          </Col>
        </Row>
        <Row>
          <div className="my-2 border">
            <Sidebar
              buttonClick={this.buttonClick}
              imageSet={this.imageSet}
              rectangles={this.state.rectangles}
              circles={this.state.circles}
              addImages={this.addImages}
              anotateSeletedImage={this.anotateSeletedImage}
              saveAnnotationsAsJson={this.saveAnnotationsAsJson}
            />
          </div>
          <div
            id="app"
            ref={(ref) => (this.drawingArea = ref)}
            className="col-md-9 m-2 p-0 border overflow-hidden"
          >
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
                  scaleX={
                    this.state.selectedImage
                      ? this.state.selectedImage.scaleX
                      : 1
                  }
                  scaleY={
                    this.state.selectedImage
                      ? this.state.selectedImage.scaleY
                      : 1
                  }
                  rector={this.state.rector}
                  circle={this.state.circle}
                />
              </Layer>

              <Layer>
                {this.state.selectedImage ? (
                  <DrawCircle
                    ref="child"
                    circles={this.state.selectedImage.annotations.circles}
                    addCircle={(newCircle) => this.addCircle(newCircle)}
                    updateCircle={this.updateCircle}
                    handleInput={this.handleInputValueCirc}
                  />
                ) : null}

                {this.state.selectedImage ? (
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
                    scaleX={this.state.selectedImage.scaleX}
                    scaleY={this.state.selectedImage.scaleY}
                  />
                ) : null}
              </Layer>
            </Stage>
          </div>
          <div className="col-md-2 p-0 border my-2">
            <NameAnnotations
              annotations={
                this.state.selectedImage
                  ? this.state.selectedImage.annotations
                  : {}
              }
              updateCircle={this.updateCircle}
              updateRectangle={this.updateRectangle}
            />
          </div>
        </Row>
      </Container>
    );
  }
}

export default App;
