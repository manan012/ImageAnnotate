import React, { Fragment } from 'react';
import Rectangle from './Rectangle';
import RectTransformer from './RectTransformer';
import { omit } from 'ramda';

// It imports 2 files from the same directory
// first is Rectangle.js which draws the rectangle
// second is RectTransformer.js which transforms/modifies the rectangle
//TODO: fix the bug where shape get smaller on each drag in scaled images.
//TODO: fix the bug where mouse leaves the edge of the rectangle in scaled images.
class DrawRect extends React.Component {

    constructor(props) {
      super(props);
    }

    componentDidUpdate = () => {
      //console.log(this.props);
    }
    
    render(){
        return(
            <Fragment>
                {this.props.rectangles.map((rect, i) => (
                <Rectangle id={i}
                  scaleX={this.props.scaleX || 1}
                  scaleY={this.props.scaleY || 1}
                  sclassName="rect"
                  key={i}
                  {...rect}
                  selectNode={this.props.selectNode}
                  onTransform={(newProps) => {
                    this.props.updateRectangle(i, newProps);
                  }}
                />
              ))}
              <RectTransformer selectedNode={this.props.selectedNode} />
            </Fragment>
        )
    }
}

export default DrawRect;