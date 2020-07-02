import React, { Fragment } from 'react';
import Circ from './Circ';
import CircleTransformer from './CircleTransformer';
import { omit } from 'ramda';

// It imports 2 files from the same directory
// first is Circ.js which draws the circle
// second is CircleTransformer.js which transforms/modifies the circle

class DrawCircle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedShapeName: '',
            mouseDown: false,
            mouseDraw: false,
            x: null,
            y: null,
            stroke: '#00A3AA',
            width: 0,
            name: "",
        };
    }

    // When mouse key is pressed down, the coordinates of the mouse gets stored in circles array

    handleStageMouseDown = (event) => {
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

        // find clicked circ by its name
        const name = event.target.name();
        //console.log(name);
        const circ = this.props.circles.find(r => r.name === name);
        if (circ) {
            this.setState({
                selectedShapeName: name,
                // circles,
            });
        } else {
            this.setState({
                selectedShapeName: '',
            });
        }
    };

    // When a properties of rectangle are changed i.e, transformation or annotated name is done, it then updates the circles array
    handleCircleChange = (index, newProps) => {
        this.props.updateCircle(index, newProps);
    };

    // when a new rectangle is drawn
    handleNewCircleChange = (event) => {
        const {x, y} = this.state;
        const stage = event.target.getStage();
        const mousePos = stage.getPointerPosition();    // get mouse position
        if (this.state.mouseDown) {
            return this.setState({
                mouseDraw: true,
                width: 2*Math.sqrt(Math.floor(Math.pow(mousePos.x - x, 2) + Math.pow(mousePos.y - y, 2)))
            })
        }
    };


    //when mouse key is released up i.e, circle is drawn
    handleStageMouseUp = () => {
        var this1 = this;
        const { mouseDraw } = this.state;
        if (mouseDraw && (this.state.width > 3)) {
            this.props.addCircle(omit(['mouseDown', 'mouseDrawn', 'selectedShapeName'], this.state))
        }

        //console.log(this1.state.circles);
        this.setState({mouseDown: false, x: null, y: null, width:0});
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
                        id={i}
                        onTransform={(newProps) => {
                            handleCircleChange(i, newProps);
                        }}

                    />
                ))}
                {this.state.x != null && this.state.y != null 
                    ? <Circ sclassName="circ" {...omit(['mouseDown', 'mouseDrawn', 'selectedShapeName'], this.state)} />
                    : null
                }
                <CircleTransformer selectedShapeName={selectedShapeName} />

            </Fragment>
        );
    }
}

export default DrawCircle;
