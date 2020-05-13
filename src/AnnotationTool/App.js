import React from 'react';
import { Stage, Layer } from 'react-konva';
import shortid from 'shortid';
//import Rectangle from './Rectangle/Rectangle';
//import RectTransformer from './Rectangle/RectTransformer';
import AnnotationImage from './AnnotationImage/AnnotationImage';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Circ from './Circle/Circ';
import CircleTransformer from './Circle/CircleTransformer';

class App extends React.Component {
  state = {
    rectangles: [],
    rectCount: 0,
    selectedShapeName: '',
    mouseDown: false,
    mouseDraw: false,
    newRectX: 0,
    newRectY: 0,
    i: 0,
  };

  componentDidMount() {
    this.img.moveToBottom();
  }

  handleStageMouseDown = (event) => {
    const { rectangles } = this.state;
    // clicked on stage - clear selection or ready to generate new rectangle
    if (event.target.className === 'Image') {
      const stage = event.target.getStage();
      const mousePos = stage.getPointerPosition();
      this.setState({
        mouseDown: true,
        newRectX: mousePos.x,
        newRectY: mousePos.y,
        selectedShapeName: '',
      });
      return;
    }
    // clicked on transformer - do nothing
    const clickedOnTransformer = event.target.getParent().className === 'Transformer';
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const name = event.target.name();
    //console.log(name);
    const rect = rectangles.find(r => r.name === name);
    if (rect) {
      this.setState({
        selectedShapeName: name,
        rectangles,
      });
    } else {
      this.setState({
        selectedShapeName: '',
      });
    }
  };

  // When a properties of rectangle are changed
  handleRectChange = (index, newProps) => {
    const { rectangles } = this.state;
    rectangles[index] = {
      ...rectangles[index],
      ...newProps,
    };

    this.setState({ rectangles });
  };

  // when a new rectangle is drawn
  handleNewRectChange = (event) => {
    const {
      rectangles, rectCount, newRectX, newRectY,
    } = this.state;
    const stage = event.target.getStage();
    //console.log('stage ', event.target);
    const mousePos = stage.getPointerPosition();    // get mouse position
    if (!rectangles[rectCount]) {
      rectangles.push({
        x: newRectX,
        y: newRectY,
        width: mousePos.x - newRectX,
        name: '',
        stroke: '#00A3AA',
        key: shortid.generate(),
      });
      return this.setState({ rectangles, mouseDraw: true });
    }
    rectangles[rectCount].width = mousePos.x - newRectX;
    return this.setState({ rectangles });
  };

  handleStageMouseUp = () => {
    var this1 = this;

    const { rectCount, mouseDraw } = this.state;
    const { rectangles, i } = this.state;
    if (mouseDraw) {
      this.setState({ rectCount: rectCount + 1, mouseDraw: false });
      var annotations = document.getElementById('annotate');
      var e1 = annotations.appendChild(document.createElement('input'));    // creating input field
      e1.className = 'fieldClass';
      e1.onchange = updateName;

      function updateName() {       //Local function to update name
        var value = this.value;
        console.log(value);
        this1.setState(Object.assign(this1.state.rectangles[i], { name: value }));
      }
      console.log(this1.state.rectangles);
      console.log(rectangles[i].name);
      this.setState({
        i: i + 1

        //this.state.rectangles[this.state.i].name = document.querySelector('input[className="fieldCLass"]');
        //this1.state.i = this1.state.i + 1;
      });
    }

    //console.log(this1.state.rectangles);
    this.setState({ mouseDown: false });
  };

  render() {
    const {
      state: { rectangles, selectedShapeName, mouseDown },
      handleStageMouseDown,
      handleNewRectChange,
      handleRectChange,
      handleStageMouseUp,
    } = this;
    return (
      <div id="app">
        <div className="row">
          <div className="sm spa">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <Stage
              ref={(node) => {
                this.stage = node;
              }}
              container="app"
              width={1200}
              height={700}
              onMouseDown={handleStageMouseDown}
              onTouchStart={handleStageMouseDown}
              onMouseMove={mouseDown && handleNewRectChange}
              onTouchMove={mouseDown && handleNewRectChange}
              onMouseUp={mouseDown && handleStageMouseUp}
              onTouchEnd={mouseDown && handleStageMouseUp}
            >
              <Layer>
                {rectangles.map((rect, i) => (
                  <Circ id="annotate"
                    sclassName="rect"
                    key={rect.key}
                    {...rect}
                    onTransform={(newProps) => {
                      handleRectChange(i, newProps);
                    }}

                  />
                ))}
                <CircleTransformer selectedShapeName={selectedShapeName} />
              </Layer>
              <Layer
                ref={(node) => {
                  this.img = node;
                }}
              >
                <AnnotationImage />
              </Layer>
            </Stage>

          </div>
          <div className="col-md-2" id="annotate">
            <h3>Annotations</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
