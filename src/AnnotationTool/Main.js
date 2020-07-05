import React from "react";
import { Stage, Layer, Line } from "react-konva";
import AnnotationImage from "./AnnotationImage/AnnotationImage";
import "./Main.css";
import Sidebar from "./Sidebar/Sidebar";
import DrawRect from "./Rectangle/DrawRect";
import DrawCircle from "./Circle/DrawCircle";
import ImageSelector from "../Images/ImageSelector";
import { Container, Row, Col } from "reactstrap";
import NameAnnotations from "./Names/NameAnnotations";
import { omit } from "ramda";
import detectObject from "../utils/objectDetection";
import saveObjectAsJSONFfile from "../utils/saveObjectAsJSONFile";
import Rectangle from "./Rectangle/Rectangle";
import Circ from "./Circle/Circ";
import DrawPolygons from "./Polygon/DrawPolygons";
import DisplayLines from "./Line/DisplayLines";

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
      selectedRectangulareNode: null,
      selectedCircularNode: null,
      selectedLineNode: null,
      selectedPolygonNode: null,
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
        strokeWidth: 5,
        name: ""
      },
      line: {
        point1: [],
        point2: [],
        stroke: "#00A3AA",
        strokeWidth: 5,
        name: ""
      },
      mousPos: [0, 0],
    };
  }

  componentDidUpdate(nextProps, nextState) {
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

  setDrawingMode = (mode) => {
    //console.log(this.state);
    this.setState((state) => ({ drawingMode: mode }));
  }

  addImages = (newImages) => {
    this.setState((state) => ({ images: [...state.images, ...newImages] }));
  };

  updateImage = (idx, updatedImages) => {
    //console.log(updatedImages);
    if (this.state.selectedImage && this.state.selectedImage.idx === idx) {
      this.setState((state) => ({
        selectedImage: {
          idx: idx,
          ...state.images[idx],
          ...updatedImages,
        },
      }));
      return;
    }
    this.setState(state => ({
      images: state.images.map((image, i) =>
        i === idx ? updatedImages : image
      ),
    }));
  };

  selectImage = (idx) => {
    console.log(idx);
    if (this.state.selectedImage && this.state.selectedImage.idx === idx)
      return;
    if (this.state.selectedImage == undefined) {
      this.setState((state =>({ selectedImage: { idx: idx, ...state.images[idx]}})));
      return;
    }
    this.setState((state) => {
      return {
        images: state.images.map((img, i) =>
          i === state.selectedImage.idx
            ? omit(["idx"], state.selectedImage)
            : img
        ),
        selectedImage: { idx: idx, ...this.state.images[idx] },
      }
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
        //console.log(newRectangles);
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
      //console.log(selectedImage);
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

  updateLine = (idx, newLineProps) => {
    this.setState((state) => ({
      selectedImage: {
        ...state.selectedImage,
        annotations: {
          ...state.selectedImage.annotations,
          lines: state.selectedImage.annotations.lines.map(
            (line, i) => i==idx ? {...line, ...newLineProps} : line
          )
        }
      }
    }))
  }

  updatePolygon = (idx, newPolygonProp) => {
    console.log(idx, newPolygonProp);
    this.setState((state) => ({
      selectedImage: {
        ...state.selectedImage,
        annotations: {
          ...state.selectedImage.annotations,
          polygons: state.selectedImage.annotations.polygons.map(
            (polygon, i) => i===idx ? {...polygon, ...newPolygonProp} : polygon
          )
        }
      }
    }))
  }

  startDrawingRectangle = (x, y) => {
    this.setState(state => ({
      mouseDown: true,
      rectangle: {
        ...state.rectangle,
        x: x,
        y: y,
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
    this.setState(state => ({
      mouseDown: true,
      circle: {
        ...state.circle,
        x: x,
        y: y
      }
    }))
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
        mousePos: [x, y]
      }
    })
  }

  startDrawingLine = (x, y) => {
    this.setState(state => ({
      mouseDown: true,
      line: {
        ...state.line,
        point1: [x, y],
        point2: [x, y]
      }
    }))
  }

  updateDrawingLine = (x, y) => {
    this.setState(state => ({
      line: {
        ...state.line,
        point2: [x, y]
      }
    }))
  }

  endDrawingLine = (x, y) => {
    this.setState(state => ({
      mouseDown: false,
      selectedImage: {
        ...state.selectImage,
        annotations: {
          ...state.selectedImage.annotations,
          lines: [...state.selectedImage.annotations.lines, state.line]
        }
      },
      line: {
        ...state.line,
        point1: [],
        point2: [],
      }
    }))
  }

  updateCurMousePosInPolygon = (x, y) => {
    this.setState({mousePos: [x, y]})
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

  selectRectangularNode = (node) => {
    this.setState({selectedRectangulareNode: node});
  }

  selectCircularNode = (node) => {
    this.setState({selectedCircularNode: node});
  }

  selectLineNode = (node) => {
    this.setState({selectedLineNode: node});
  }

  selectPolygonNode = (node) => {
    this.setState({selectedPolygonNode: node});
  }

  detachTrasformer = (className) => {
    if (className != "Rect") this.selectRectangularNode(null);
    if (className != 'Circle') this.selectCircularNode(null);
    if (className!='Rect') this.selectLineNode(null);
    if (className!='Rect') this.selectPolygonNode(null);

  }

  //Signout Button Action
  handleSubmit(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  // Calling child functions inside parent
  handleNewShapeChange = (event) => {
    //For rectangle
    if (this.state.mouseDown && this.state.drawingMode === 'rectangle') {
      const mousePos = event.target.getStage().getPointerPosition();
      this.updateDrawingRectangle(mousePos.x, mousePos.y);
      return;
    }

    if (this.state.mouseDown && this.state.drawingMode == 'circle') {
      const stage = event.target.getStage();
      const mousePos = stage.getPointerPosition();
      this.updateDrawingCircle(mousePos.x, mousePos.y);
      return;
    }

    if (this.state.mouseDown && this.state.drawingMode === "line") {
      const stage = event.target.getStage();
      const mousePos = stage.getPointerPosition();
      this.updateDrawingLine(mousePos.x, mousePos.y);
      return;
    }

    if (this.state.drawingMode === 'polygon' && this.state.polygon.points.length >= 1) {
      const stage = event.target.getStage();
      const mousePos = stage.getPointerPosition();
      this.updateCurMousePosInPolygon(mousePos.x, mousePos.y);
      return;
    }
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

    if (this.state.mouseDown && this.state.drawingMode === 'line') {
      this.endDrawingLine();
    }
  };

  // When mouse key is pressed down
  handleStageMouseDown = (event) => {
    //For rectangle
    console.log("mouseDown", event.target.className);
    const clickedOn = event.target.className;
    if (!this.state.selectedImage) return;
    if (this.state.drawingMode === "delete") {
      this.detachTrasformer("");
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
    //this.detachTrasformer(event.target.className);
    if ((clickedOn === "Image" || (this.state.polygon.points.length >= 3 && clickedOn === "Line")) && this.state.drawingMode === 'polygon') {
      const stage = event.target.getStage();
      const mousePos = stage.getPointerPosition();
      this.addPointToPolygon(mousePos.x, mousePos.y);
    }

    if (clickedOn==="Image") {
      if (this.state.drawingMode === 'rectangle') {
        const mousePos = event.target.getStage().getPointerPosition();
        this.startDrawingRectangle(mousePos.x, mousePos.y);
        return;
      }

      if (this.state.drawingMode === 'circle') {
        const stage = event.target.getStage();
        const mousePos = stage.getPointerPosition();
        this.startDrawingCircle(mousePos.x, mousePos.y);
        return;
      } 

      if (this.state.drawingMode ==="line") {
        const stage = event.target.getStage();
        const mousePos = stage.getPointerPosition();
        this.startDrawingLine(mousePos.x, mousePos.y);
      }
    }
  };

  render() {
    let {
      state: { polygon: {
        points,
      },
        mousePos,
      },
      handleNewShapeChange,
      handleStageMouseDown,
      handleStageMouseUp,
    } = this;
    points = points.concat(mousePos)
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
                    selectedNode={this.state.selectedCircularNode}
                    selectNode={this.selectCircularNode}
                    updateCircle={this.updateCircle}
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
                    updateRectangle={this.updateRectangle}
                    scaleX={this.state.selectedImage.scaleX}
                    scaleY={this.state.selectedImage.scaleY}
                    selectNode={this.selectRectangularNode}
                    selectedNode={this.state.selectedRectangulareNode}
                  />
                ) : null}
                {
                  this.state.selectedImage ? (
                    <DrawPolygons 
                      polygons={this.state.selectedImage.annotations.polygons} 
                      selectNode={this.selectPolygonNode}
                      selectedNode={this.state.selectedPolygonNode}
                      updatePolygon={this.updatePolygon}/>
                  ): null
                }
                {
                  this.state.selectedImage ? 
                    <DisplayLines 
                      lines={this.state.selectedImage.annotations.lines} 
                      updateLine={this.updateLine}
                      selectNode={this.selectLineNode}
                      selectedNode={this.state.selectedLineNode}
                      />
                    : null
                }
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
                      points={points} 
                      stroke='#00A3AA'
                      strokeWidth={5}
                    />
                  :null
                }
                {
                  (this.state.drawingMode === 'line' && this.state.mouseDown) ?
                    <Line 
                      points={[...this.state.line.point1, ...this.state.line.point2]} 
                      stroke='#00A3AA'
                      strokeWidth={5}
                    />
                  :null
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
