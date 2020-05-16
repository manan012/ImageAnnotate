import React from 'react';
import { Stage, Layer } from 'react-konva';
import AnnotationImage from './AnnotationImage/AnnotationImage';
import './Main.css';
import Sidebar from './Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import DrawRect from './Rectangle/DrawRect';
import { Button } from 'reactstrap';
import DrawCircle from './Circle/DrawCircle';
import { useHistory } from 'react-router-dom';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      image: "",
      stageWidth: 1000,
      mouseDown : false,
      rector : false,
      circle : false,
      line: false,
      polygon: false,
      point: false,
      rectangles:[],
      circles:[],
    };
  this.handleInputValueRect = this.handleInputValueRect.bind(this);
  this.handleInputValueCirc = this.handleInputValueCirc.bind(this);
    
  }

  handleSubmit(event) {
    event.preventDefault();
    //console.log('hello');
    localStorage.removeItem("token");
    window.location.href="/"
    // window.location.pathname = '/';
}


  handleInputValueRect(val) {
    //console.log('hell0', val);
    this.setState({rectangles:val});
    //console.log('hell', this.state.rectangles);
  }

  handleInputValueCirc(val) {
    this.setState({circles:val});
  }

  //Setting background image
  imageSet = (file) =>{
    this.setState({image: file})
  }

  // Calling child functions inside parent
  handleNewShapeChange = (event) =>{
    if(this.state.rector){
      //console.log('hello');
      
      this.refs.child1.handleNewRectChange(event);
    }

    else if(this.state.circle){
      this.refs.child.handleNewCircleChange(event);
    }
  }
  handleStageMouseUp = () =>{
    if(this.state.rector){
      this.refs.child1.handleStageMouseUp();
      this.setState({mouseDown : this.refs.child1.state.mouseDown});
    }

    else if(this.state.circle){
      this.refs.child.handleStageMouseUp();
      this.setState({mouseDown : this.refs.child.state.mouseDown});
    }
  }
  handleStageMouseDown = (event) =>{
    if(this.state.rector){
      this.refs.child1.handleStageMouseDown(event);
      this.setState({mouseDown : this.refs.child1.state.mouseDown})
    }

    else if(this.state.circle) {
      this.refs.child.handleStageMouseDown(event);
      this.setState({mouseDown: this.refs.child.state.mouseDown})
    }
  }

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
      stageWidth: window.innerWidth*0.764
    });
  };

  //Setting the buttons
  buttonClick = (rector, circle, line, polygon, point)=>{
    this.setState({rector , circle, line , polygon, point})
  }

  render() {

    const { state : {mouseDown},
      handleNewShapeChange,
      handleStageMouseDown,
      handleStageMouseUp
    } = this;
    
    return (
      <div className="whole">
      <div className = "row" >
        <div className="col-md-2"></div>

        <div className="col-md-8 name" style={{color:'#08c751'}}>
        <h1><b>Image Annotator</b></h1>
        </div>
        <div className="col-md-2 name1">
        <Button color="primary" type='submit' onClick={this.handleSubmit}>Log out</Button>
        </div>
      </div>
        <div className="row">
          <div className="sm spa">
            <Sidebar buttonClick = {this.buttonClick} imageSet = {this.imageSet} rectangles={this.state.rectangles} circles={this.state.circles}/>
          </div>
          <div id="app" className="col-md-9">
            <Stage
              ref={(node) => {
                this.stage = node;
              }}
              container="app"
              width= { this.state.stageWidth}
              height= { window.innerHeight * 0.88}
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
                <AnnotationImage image = {this.state.image}/>
              </Layer>

              <Layer>
                
                <DrawCircle ref = "child" handleInput={this.handleInputValueCirc}/>
                <DrawRect ref = "child1" handleInput={this.handleInputValueRect}/>

                </Layer>
                {/* <Layer>
                <DrawCircle ref = "child" handleInput={this.handleInputValueCirc}/>

              </Layer> */}
                

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

