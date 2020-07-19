import React from "react";
import { Stage, Layer, Line } from "react-konva";
import AnnotationImage from "./AnnotationImage/AnnotationImage";
import "./Main.css";
import Sidebar from "./Sidebar/Sidebar";
import DrawRect from "./Rectangle/DrawRect";
import DrawCircle from "./Circle/DrawCircle";
import { Container } from "reactstrap";
import NameAnnotations from "./Names/NameAnnotations";
import { omit, flatten } from "ramda";
import detectObject from "../utils/objectDetection";
import saveObjectAsJSONFfile from "../utils/saveObjectAsJSONFile";
import Rectangle from "./Rectangle/Rectangle";
import Circ from "./Circle/Circ";
import DrawPolygons from "./Polygon/DrawPolygons";
import DisplayLines from "./Line/DisplayLines";
import { connect } from "react-redux";
import { baseURL } from "../config";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedImage: undefined,
      mouseDown: false,
      drawingMode: "rectangle",
      rector: false,
      drawingAreaWidth: 0,
      drawingAreaHeight: 0,
      line: false,
      point: false,
      selectedRectangulareNode: null,
      selectedCircularNode: null,
      selectedLineNode: null,
      selectedPolygonNode: null,
      stageScaleX: 1,
      stageScaleY: 1,
      rectangle: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        stroke: "#00A3AA",
        name: "",
      },
      circle: {
        x: 0,
        y: 0,
        width: 0,
        stroke: "#00A3AA",
        name: "",
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

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  componentDidMount = () => {
    this.setState({
      drawingAreaHeight: this.drawingArea.getBoundingClientRect().height,
      drawingAreaWidth: this.drawingArea.getBoundingClientRect().width,
    });
    window.addEventListener("resize", this.updateDrawingAreaSize);
    // window.addEventListener("resize", this.correctScaleOfSelectedImage);
    const publicURL = baseURL + 'public/'
    this.props.imagesInAllDataset.map(async (img) => {
      const blob = await this.downloadFile(publicURL + img.location);
      const readedImg = await this.readImage(blob);

      const height = readedImg.height;
      const width = readedImg.width;
      const ratio = width/height;
      const drawingAreaHeight = this.state.drawingAreaHeight;
      const drawingAreaWidth = this.state.drawingAreaWidth;
      const resizedWidth = drawingAreaWidth;
      const resizedHeight = resizedWidth/ratio;
      const scaleX = resizedWidth/width;
      const scaleY = resizedHeight/height;

      this.addImages([{
        file: blob,
        name: img.imageName,
        image: readedImg,
        height: height, 
        width: width, 
        ratio: ratio,
        resizedHeight: resizedHeight,
        resizedWidth: resizedWidth,
        scaleX: scaleX,
        scaleY: scaleY,
        annotations: { rectangles: [], circles: [], polygons: [], lines: [] },
      }])
    })
  };

  downloadFile = (url) => new Promise((res, rej) => {
    try {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType="blob";
      xhr.onload = () => {
        console.log(xhr.response);
        return res(xhr.response);
      }
      xhr.send();
    } catch (e) {
      return rej(e);
    }
  })

  readImage = (blob) => new Promise((res, rej) => {
    try {
      const imageUrl = URL.createObjectURL(blob);
      const img = document.createElement('img');
      img.src = imageUrl;
      img.onload = () => {
        res(img);
      }
    } catch(e) {
      rej(e);
    }
  })

  updateDrawingAreaSize = () => {
    const boundingRect = this.drawingArea.getBoundingClientRect();
    this.setState({
      drawingAreaHeight: boundingRect.height,
      drawingAreaWidth: boundingRect.width,
    });
  };

  setDrawingMode = (mode) => {
    //console.log(this.state);
    this.setState((state) => ({ drawingMode: mode }));
  };

  addImages = (newImages) => {
    this.setState((state) => ({ images: [...state.images, ...newImages] }), () => {
      if (!this.state.selectedImage) this.selectImage(0);
    });
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
    if (this.state.selectedImage && this.state.selectedImage.idx === idx) {
      console.log('image is already selected');
      return;
    }
    if (this.state.selectedImage == undefined) {
      this.setState((state =>({ selectedImage: { idx: idx, ...state.images[idx]}})));
      return;
    }
    this.setState((state) => {
      console.log(state.selectedImage);
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
    this.setState((state) => ({
      mouseDown: true,
      rectangle: {
        ...state.rectangle,
        x: x/this.state.selectedImage.scaleX,
        y: y/this.state.selectedImage.scaleY,
      }
    }));
  };

  updateDrawingRectangle = (x, y) => {
    this.setState((state) => ({
      rectangle: {
        ...state.rectangle,
        width: x/this.state.selectedImage.scaleX-state.rectangle.x,
        height: y/this.state.selectedImage.scaleY-state.rectangle.y
      }
    }))
  }

  endDrawingRectangle = () => {
    this.setState((state) => {
      if (
        Math.abs(state.rectangle.width) < 10 ||
        Math.abs(state.rectangle.height) < 10
      ) {
        return {
          mouseDown: false,
          rectangle: {
            ...state.rectangle,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
          },
        };
      }
      return {
        mouseDown: false,
        selectedImage: {
          ...state.selectedImage,
          annotations: {
            ...state.selectedImage.annotations,
            rectangles: [
              ...state.selectedImage.annotations.rectangles,
              state.rectangle,
            ],
          },
        },
        rectangle: {
          ...state.rectangle,
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
      };
    });
  };

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
    this.setState((state) => {
      return {
        circle: {
          ...state.circle,
          width: 2*Math.sqrt(Math.floor(Math.pow((x - state.circle.x), 2) 
                            + Math.pow((y - state.circle.y), 2)))
        }
      }
    })
  }

  endDrawingCircle = () => {
    this.setState((state) => {
      if (state.circle.width <= 5) {
        return {
          mouseDown: false,
          circle: {
            ...state.circle,
            x: 0,
            y: 0,
            width: 0,
          },
        };
      }
      return {
        mouseDown: false,
        selectedImage: {
          ...state.selectedImage,
          annotations: {
            ...state.selectedImage.annotations,
            circles: [...state.selectedImage.annotations.circles, state.circle],
          },
        },
        circle: {
          ...state.circle,
          x: 0,
          y: 0,
          width: 0,
        },
      };
    });
  };

  addPointToPolygon = (x, y) => {
    this.setState((state) => {
      const { points } = state.polygon;
      if (
        points.length >= 3 &&
        Math.abs(points[0] - x) <= 10 &&
        Math.abs(points[1] - y) <= 10
      ) {
        return {
          selectedImage: {
            ...state.selectedImage,
            annotations: {
              ...state.selectedImage.annotations,
              polygons: [
                ...state.selectedImage.annotations.polygons,
                state.polygon,
              ],
            },
          },
          polygon: {
            ...state.polygon,
            points: [],
          },
        };
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
        ...state.selectedImage,
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
      data[img.name] = img.annotations;
    });
    if (this.state.selectedImage) {
      data[
        this.state.selectedImage.name
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
    if (className != "Image") return;
    this.selectRectangularNode(null);
    this.selectCircularNode(null);
    this.selectLineNode(null);
    this.selectPolygonNode(null);
  }

  zoomIn = (x, y) => {
    console.log(x, y);
    this.setState(state => this.setState({
      stageScaleX: state.stageScaleX+0.2,
      stageScaleY: state.stageScaleY+0.2
    }))
  }

  zoomOut = (x, y) => {
    this.setState(state => this.setState({
      stageScaleX: state.stageScaleX <= 0.5 ? state.stageScaleX : state.stageScaleX-0.2,
      stageScaleY: state.stageScaleY <= 0.5 ? state.stageScaleY : state.stageScaleY-0.2
    }))
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
    if (this.state.mouseDown && this.state.drawingMode === "rectangle") {
      const mousePos = event.target.getStage().getPointerPosition();
      this.updateDrawingRectangle(mousePos.x, mousePos.y);
      return;
    }

    if (this.state.mouseDown && this.state.drawingMode == "circle") {
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

    if (
      this.state.drawingMode === "polygon" &&
      this.state.polygon.points.length >= 1
    ) {
      const stage = event.target.getStage();
      const mousePos = stage.getPointerPosition();
      this.updateCurMousePosInPolygon(mousePos.x, mousePos.y);
      return;
    }
  };

  // When mouse key is released up
  handleStageMouseUp = () => {
    //For Rectangle
    if (this.state.mouseDown && this.state.drawingMode === "rectangle") {
      this.endDrawingRectangle();
    }

    if (this.state.mouseDown && this.state.drawingMode === "circle") {
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
      this.detachTrasformer("Image");
      const className = event.target.className;
      const id = event.target.attrs.id;
      if (className == "Rect") {
        this.deleteShape("rectangles", id);
      }
      if (className == "Circle") {
        this.deleteShape("circles", id);
      }
    }
    this.detachTrasformer(event.target.className);
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

      if (this.state.drawingMode === "circle") {
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

      if (this.state.drawingMode === 'zoomIn') {
        const stage = event.target.getStage();
        const mousePos = stage.getPointerPosition();
        this.zoomIn(mousePos.x, mousePos.y);
      }

      if (this.state.drawingMode === 'zoomOut') {
        const stage = event.target.getStage();
        const mousePos = stage.getPointerPosition();
        this.zoomOut(mousePos.x, mousePos.y);
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
      <Container fluid>
        <div className="d-flex">
          <div className="my-2 border">
            <Sidebar
              imageSet={this.imageSet}
              rectangles={this.state.rectangles}
              circles={this.state.circles}
              addImages={this.addImages}
              anotateSeletedImage={this.anotateSeletedImage}
              saveAnnotationsAsJson={this.saveAnnotationsAsJson}
              setDrawingMode={this.setDrawingMode}
              drawingMode={this.state.drawingMode}
              selectNext={() => {this.state.selectedImage && this.state.selectedImage.idx !== this.state.images.length -1 ? this.selectImage(this.state.selectedImage.idx + 1) : null}}
              selectPrev={() => {this.state.selectedImage && this.state.selectedImage.idx !== 0  ? this.selectImage(this.state.selectedImage.idx - 1) : null}}
            />
          </div>
          <div
            id="app"
            ref={(ref) => (this.drawingArea = ref)}
            className="flex-grow-1 m-2 p-0 border"
            style={{height: "90vh", overflow: "scroll"}}
          >
            <Stage
              ref={(node) => {
                this.stage = node;
              }}
              scaleX={this.state.stageScaleX}
              scaleY={this.state.stageScaleY}
              container="app"
              width={this.state.drawingAreaWidth}
              height={this.state.selectedImage ? this.state.selectedImage.resizedHeight : this.state.drawingAreaHeight}
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
                  height={this.state.selectedImage ? this.state.selectedImage.height: 0}
                  width={this.state.selectedImage ? this.state.selectedImage.width : 0}
                />
              </Layer>

              <Layer>
                {this.state.selectedImage ? (
                  <DrawCircle
                    ref="child"
                    circles={this.state.selectedImage.annotations.circles}
                    selectedNode={this.state.selectedCircularNode}
                    selectNode={this.selectCircularNode}
                    scaleX={this.state.selectedImage.scaleX}
                    scaleY={this.state.selectedImage.scaleY}
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
          <div className="p-0 border my-2" style={{"width": 200}}>
            <NameAnnotations
              annotations={
                this.state.selectedImage
                  ? this.state.selectedImage.annotations
                  : {}
              }
              updateCircle={this.updateCircle}
              updateRectangle={this.updateRectangle}
              updateLine={this.updateLine}
              updatePolygon={this.updatePolygon}
            />
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProp = (state) => ({
  imagesInAllDataset: (state.projects.project.status === 'NOT_FETCHED' ? [] 
          : flatten(state.projects.project.attachedDatasets.
          map(dataset => dataset.images)))
})

export default connect(mapStateToProp)(App);
