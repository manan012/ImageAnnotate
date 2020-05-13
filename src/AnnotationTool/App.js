import React from 'react';
import { Stage, Layer } from 'react-konva';
import AnnotationImage from './AnnotationImage/AnnotationImage';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import DrawRect from './Rectangle/DrawRect';

class App extends React.Component {
  state = {
    image: "",
    stageWidth: 1000,
    mouseDown : false
  };

  imageSet = (file) =>{
    this.setState({image: file})
  }

  handleNewRectChange = (event) =>{
    this.refs.child.handleNewRectChange(event);
  }
  handleStageMouseUp = () =>{
    this.refs.child.handleStageMouseUp();
    this.setState({mouseDown : this.refs.child.state.mouseDown})
    console.log(this.refs.child.state.mouseDown);
    
  }
  handleStageMouseDown = (event) =>{
    // console.log(this.refs.child);
    this.refs.child.handleStageMouseDown(event);
    this.setState({mouseDown : this.refs.child.state.mouseDown})
    console.log(this.refs.child.state.mouseDown);
  }

  //To resize the canvas dynamically
  componentDidMount() {
    this.checkSize();
    window.addEventListener("resize", this.checkSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkSize);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if(this.state !== prevState){
  //     this.setState({mouseDown : this.refs.child.state.mouseDown})
  //   }
  // }

  checkSize = () => {
    this.setState({
      stageWidth: window.innerWidth*0.763
    });
  };

  render() {

    const { state : {mouseDown},
      handleNewRectChange,
      handleStageMouseDown,
      handleStageMouseUp
    } = this;
    
    return (
      <div>
      <div className = "row" style={{justifyContent : "center", color : "#00edae"}}><h1>Image Annotator</h1></div>
        <div className="row">
          <div className="sm spa">
            <Sidebar imageSet = {this.imageSet}/>
          </div>
          <div id="app" className="col-md-9">
            <Stage
              ref={(node) => {
                this.stage = node;
              }}
              container="app"
              width= { this.state.stageWidth}
              height= { window.innerHeight * 0.90}
              onMouseDown={handleStageMouseDown}
              onTouchStart={handleStageMouseDown}
              onMouseMove={mouseDown && handleNewRectChange}
              onTouchMove={mouseDown && handleNewRectChange}
              onMouseUp={mouseDown && handleStageMouseUp}
              onTouchEnd={mouseDown && handleStageMouseUp}
              
            >
              <Layer
                ref={(node) => {
                  this.img = node;
                }}
              >
                <AnnotationImage image = {this.state.image}/>
              </Layer>

              <DrawRect ref = "child"/>
            </Stage>

          </div>
          <div className="col-md-2" id = "annotate">
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
