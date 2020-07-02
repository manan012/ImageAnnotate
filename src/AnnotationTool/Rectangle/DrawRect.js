import React, { Fragment } from 'react';
import Rectangle from './Rectangle';
import RectTransformer from './RectTransformer';
import { omit } from 'ramda';

// It imports 2 files from the same directory
// first is Rectangle.js which draws the rectangle
// second is RectTransformer.js which transforms/modifies the rectangle
//TODO: fix the bug where shape get smaller on each drag in scaled images.
//TODO: fix the bug where mouse leaves the edge of the rectangle in scaled images.
class DrawRect extends React.Component{
    state = {
        selectedShapeName: '',
        mouseDown: false,
        mouseDraw: false,
        x: null,
        y: null,
        width: 0,
        height: 0,
        name: "",
        stroke: "#00A3AA", 
    }

    componentWillUpdate = () => {
      console.log(this.state);
    }
    //When mouse key is pressed down
    handleStageMouseDown = (event) => {
        const { rectangles } = this.state;
        
        // clicked on stage - clear selection or ready to generate new rectangle
        if (event.target.className === 'Image') {
          const stage = event.target.getStage();
          const mousePos = stage.getPointerPosition();
          this.setState({
            mouseDown: true,
            x: mousePos.x,
            y: mousePos.y,
            selectedShapeName: '',
          });
          return;
        }
        // clicked on transformer - do nothing
        const clickedOnTransformer = event.target.getParent().className === 'Transformer';
        if (clickedOnTransformer) {
          return;
        }
    
        // find clicked rect by its name for its modification
        const name = event.target.name();
        const rect = this.props.rectangles.find(r => r.name === name);
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
        this.props.updateRectangle(index, newProps);
      };
    
      // when a new rectangle is drawn
      handleNewRectChange = (event) => {
        const {
          x, y
        } = this.state;
        const stage = event.target.getStage();
        const mousePos = stage.getPointerPosition();    // get mouse position
        if (this.state.mouseDown) {
          return this.setState({mouseDraw: true,
              width: (mousePos.x - x)*(1/this.props.scaleX),
              height: (mousePos.y - y)*(1/this.props.scaleY),
          });
        }
      };
      
      //When mouse key is released
      handleStageMouseUp = () => {
        const {mouseDraw, width, height} = this.state
        if (mouseDraw && Math.abs(width) > 3 && Math.abs(height) > 3) {
          this.props.addRectangle(omit(['mouseDown', 'mouseDraw', 'selectedShapeName'], this.state));
        }
    
        //console.log(this1.state.rectangles);
        this.setState({ mouseDown: false, x: null, y: null, width:0, height:0});
      };

      

    render(){
        const {
            state: { rectangles, selectedShapeName },
            handleRectChange,
          } = this;
        return(
            <Fragment>
                {this.props.rectangles.map((rect, i) => (
                <Rectangle id={i}
                  scaleX={this.props.scaleX || 1}
                  scaleY={this.props.scaleY || 1}
                  sclassName="rect"
                  key={i}
                  {...rect}
                  onTransform={(newProps) => {
                    handleRectChange(i, newProps);
                  }}
                />
              ))}
              {
                this.state.x !== null && this.state.y != null
                  ? <Rectangle id="annotate"
                      sclassName="rect"
                      scaleX={this.props.scaleX || 1}
                      scaleY={this.props.scaleY || 1}
                      {...omit(['mouseDown', 'mouseDraw', 'selectedShapeName'], this.state)}
                    />
                  : null
              }
              <RectTransformer selectedShapeName={selectedShapeName} />
            </Fragment>
        )
    }
}

export default DrawRect;