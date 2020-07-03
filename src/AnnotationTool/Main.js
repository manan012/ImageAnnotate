import React from "react";
import { Stage, Layer, Line } from "react-konva";
import AnnotationImage from "./AnnotationImage/AnnotationImage";
import "./Main.css";
import Sidebar from "./Sidebar/Sidebar";
import DrawRect from "./Rectangle/DrawRect";
import { Button } from "reactstrap";
import DrawCircle from "./Circle/DrawCircle";
import ImageSelector from "../Images/ImageSelector";
import { Container, Row, Col } from "reactstrap";
import NameAnnotations from "./Names/NameAnnotations";
import { omit, flatten } from "ramda";
import GoogleDrive from "../GoogleDrive/GoogleDrive";
import detectObject from "../utils/objectDetection";
import saveObjectAsJSONFfile from "../utils/saveObjectAsJSONFile";
import Rectangle from "./Rectangle/Rectangle";
import { abs } from "@tensorflow/tfjs-core";
import Circ from "./Circle/Circ";

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
      drawingMode: "circle",
      rector: false,
      // circle: false,
      drawingAreaWidth: 0,
      drawingAreaHeight: 0,
      line: false,
      //polygon: false,
      point: false,
      rectangle: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        stroke: "#00A3AA",
        name: ""
      },
      circle: {
        x: 0,
        y: 0,
        width: 0,
        stroke: "#00A3AA",
        name: ""
      },
      polygon: {
        points: [],
        stroke: "#00A3AA",
        name: ""
      },
      mouseX: 0,
      mouseY: 0,
    };
    this.handleInputValueRect = this.handleInputValueRect.bind(this);
    this.handleInputValueCirc = this.handleInputValueCirc.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log(this.state);
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

  setDrawingMode = (mode) => {
    console.log(this.state);
    this.setState((state) => ({ drawingMode: mode }));
  }

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

  startDrawingRectangle = (x, y) => {
    this.setState(state => ({
      mouseDown: true,
      rectangle: {
        ...state.rectangle,
        x: x,
        y: y,
        mouseX: x,
        mouseY: y
      }
    }));
  }

  updateDrawingRectangle = (x, y) => {
    this.setState(state => ({
      rectangle: {
        ...state.rectangle,
        width: x-state.rectangle.x,
        height: y-state.rectangle.y
      }
    }))
  }

  endDrawingRectangle = () => {
    this.setState(state => {
      if (Math.abs(state.rectangle.width) < 10 || Math.abs(state.rectangle.height) < 10) {
        return {
          mouseDown: false,
          rectangle: {
            ...state.rectangle,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
          }
        }
      }
      return {
      mouseDown: false,
      selectedImage: {
        ...state.selectedImage,
        annotations: {
          ...state.selectedImage.annotations,
          rectangles: [...state.selectedImage.annotations.rectangles, state.rectangle]
        },
      },
      rectangle: {
        ...state.rectangle,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      }
    }})
  }

  startDrawingCircle = (x, y) => {
    this.setState(state => {
      return {
        mouseDown: true,
        circle: {
          ...state.circle,
          x: x,
          y: y
        }
      }
    })
  }

  updateDrawingCircle = (x, y) => {
    this.setState(state => {
      return {
        circle: {
          ...state.circle,
          width: 2*Math.sqrt(Math.floor(Math.pow(x - state.circle.x, 2) + Math.pow(y - state.circle.y, 2)))
        }
      }
    })
  }

  endDrawingCircle = () => {
    this.setState(state => {
      if (state.circle.width <= 5) {
        return {
          mouseDown: false,
          circle: {
            ...state.circle,
            x: 0,
            y: 0,
            width: 0
          }
        }
      }
      return {
        mouseDown: false,
        selectedImage: {
          ...state.selectedImage,
          annotations: {
            ...state.selectedImage.annotations,
            circles: [...state.selectedImage.annotations.circles, state.circle]
          }
        },
        circle: {
          ...state.circle,
          x: 0,
          y: 0,
          width: 0
        }
      }
    })
  }

  addPointToPolygon = (x, y) => {
    this.setState(state=> {
      const {points} = state.polygon;
      if (points.length >= 3 && (Math.abs(points[0]-x) <= 10 && Math.abs(points[1]-y) <= 10)) {
        return {
          selectedImage: {
            ...state.selectedImage,
            annotations: {
              ...state.selectedImage.annotations,
              polygons: [...state.selectedImage.annotations.polygons, state.polygon]
            }
          },
          polygon: {
            ...state.polygon,
            points: [],
          }
        }
      }
      return {
        polygon: {
          ...state.polygon,
          points: [...this.state.polygon.points, x, y],
        },
        mouseX: x,
        mouseY: y
      }
    })
  }

  updateCurMousePosInPolygon = (x, y) => {
    this.setState(state => {
      return {
        mouseX: x,
        mouseY: y
      }
    })
  }

  deleteShape = (type, idx) => {
    this.setState((state) => ({
      ...state,
      selectedImage: {
        ...state.selectedImage,
        annotations: {
          ...state.selectedImage.annotations,
          [type]: state.selectedImage.annotations[type].filter(
            (shape, i) => i !== idx
          ),
        },
      },
    }));
  };

  saveAnnotationsAsJson = () => {
    const data = {};
    this.state.images.map((img) => {
      data[img.file.name] = img.annotations;
    });
    if (this.state.selectedImage) {
      data[
        this.state.selectedImage.file.name
      ] = this.state.selectedImage.annotations;
    }
    saveObjectAsJSONFfile(data, "annotations");
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
    if (this.state.mouseDown && this.state.drawingMode === 'rectangle') {
      const mousePos = event.target.getStage().getPointerPosition();
      this.updateDrawingRectangle(mousePos.x, mousePos.y);
    }

    if (this.state.mouseDown && this.state.drawingMode == 'circle') {
      const stage = event.target.getStage();
      const mousePos = stage.getPointerPosition();
      this.updateDrawingCircle(mousePos.x, mousePos.y);
    }

    if (this.state.drawingMode === 'polygon' && this.state.polygon.points.length >= 1) {
      const stage = event.target.getStage();
      const mousePos = stage.getPointerPosition();
      this.updateCurMousePosInPolygon(mousePos.x, mousePos.y);
    }
    // if (this.state.rector) {
    //   this.refs.child1.handleNewRectChange(event);
    // }

    // //For Circle
    // else if (this.state.circle) {
    //   this.refs.child.handleNewCircleChange(event);
    // }
  };

  // When mouse key is released up
  handleStageMouseUp = () => {
    //For Rectangle
    if (this.state.mouseDown && this.state.drawingMode === 'rectangle') {
      this.endDrawingRectangle();
    }

    if (this.state.mouseDown && this.state.drawingMode === 'circle') {
      this.endDrawingCircle();
    }
    // if (this.state.rector) {
    //   this.refs.child1.handleStageMouseUp();
    //   this.setState({ mouseDown: this.refs.child1.state.mouseDown });
    // }

    // //For Circle
    // else if (this.state.circle) {
    //   this.refs.child.handleStageMouseUp();
    //   this.setState({ mouseDown: this.refs.child.state.mouseDown });
    // }
  };

  // When mouse key is pressed down
  handleStageMouseDown = (event) => {
    //For rectangle
    console.log("mouseDown", event.target.className);
    const clickedOn = event.target.className;
    if (!this.state.selectedImage) return;
    if (this.state.drawingMode === "delete") {
      const className = event.target.className;
      const id = event.target.attrs.id;
      if (className == "Rect") {
        this.deleteShape("rectangles", id);
      }
      if (className == "Circle") {
        this.deleteShape("circles", id);
      }
      return;
    }
    if (clickedOn==="Image") {
      if (this.state.drawingMode === 'rectangle') {
        const mousePos = event.target.getStage().getPointerPosition();
        this.startDrawingRectangle(mousePos.x, mousePos.y);
      }

      if (this.state.drawingMode === 'circle') {
        const stage = event.target.getStage();
        const mousePos = stage.getPointerPosition();
        this.startDrawingCircle(mousePos.x, mousePos.y);
      }
    }
    if ((clickedOn === "Image" || clickedOn === "Line") && this.state.drawingMode === 'polygon') {
      const stage = event.target.getStage();
      const mousePos = stage.getPointerPosition();
      this.addPointToPolygon(mousePos.x, mousePos.y);
    }
    // if (this.state.rector) {
    //   this.refs.child1.handleStageMouseDown(event);
    //   this.setState({ mouseDown: this.refs.child1.state.mouseDown });
    // }

    // //For Circle
    // else if (this.state.circle) {
    //   this.refs.child.handleStageMouseDown(event);
    //   this.setState({ mouseDown: this.refs.child.state.mouseDown });
    // }
  };

  //To resize the canvasdynamically
  // componentDidMount() {
  //   this.checkSize();
  //   window.addEventListener("resize", this.checkSize);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.checkSize);
  // }

  // checkSize = () => {
  //   this.setState({
  //     stageWidth: window.innerWidth * 0.764,
  //   });
  // };

  //Setting the buttons
  buttonClick = (rector, circle, line, polygon, point) => {
    //this.setState({ rector, circle, line, polygon, point });
  };

  render() {
    const {
      state: { mouseDown, polygon: {
        points,
      },
      mouseX,
      mouseY 
      },
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
              setDrawingMode={this.setDrawingMode}
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
              onMouseMove={handleNewShapeChange}
              onTouchMove={handleNewShapeChange}
              onMouseUp={handleStageMouseUp}
              onTouchEnd={handleStageMouseUp}
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
                {
                  this.state.mouseDown && this.state.drawingMode ==='rectangle' ?
                  <Rectangle id="annotate"
                    sclassName="rect"
                    scaleX={this.state.selectedImage.scaleX || 1}
                    scaleY={this.state.selectedImage.scaleY || 1}
                    {...this.state.rectangle}
                  />:
                  null
                }
                {
                  this.state.mouseDown && this.state.drawingMode === 'circle' ?
                    <Circ sclassName="circ" {...this.state.circle} />
                  : null
                }
                {
                  (this.state.drawingMode === 'polygon' && points.length >= 1) ?
                    <Line 
                      points={points.concat([mouseX, mouseY])} 
                      stroke='#00A3AA'
                      strokeWidth={4}
                    />
                  :null
                }
              </Layer>
              <Layer>
                {
                  this.state.selectedImage ?
                  this.state.selectedImage.annotations.polygons.map((poly, i) => {
                    return <Line key={i} points={poly.points} stroke={poly.stroke} strokeWidth={4} closed/>
                  }): null
                }
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
