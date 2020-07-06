import React, { Fragment } from 'react';
import Circ from './Circ';
import CircleTransformer from './CircleTransformer';

// It imports 2 files from the same directory
// first is Circ.js which draws the circle
// second is CircleTransformer.js which transforms/modifies the circle

class DrawCircle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedShapeName: ''
        };
    }
    // When a properties of rectangle are changed i.e, transformation or annotated name is done, it then updates the circles array
    handleCircleChange = (index, newProps) => {
        this.props.updateCircle(index, newProps);
    };

    render() {
        const {
            state: { circles, selectedShapeName },
            handleCircleChange,
        } = this;
        return (

            <Fragment>
                {this.props.circles.map((circ, i) => (
                    <Circ id="annotate"
                        sclassName="circ"
                        key={circ.key}
                        {...circ}
                        scaleX={this.props.scaleX}
                        scaleY={this.props.scaleY}
                        id={i}
                        selectNode={this.props.selectNode}
                        onTransform={(newProps) => {
                            handleCircleChange(i, newProps);
                        }}

                    />
                ))}
                <CircleTransformer selectedNode={this.props.selectedNode} selectedShapeName={selectedShapeName} />
            </Fragment>
        );
    }
}

export default DrawCircle;
