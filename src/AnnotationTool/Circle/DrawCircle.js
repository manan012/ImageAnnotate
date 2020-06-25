import React, { Fragment } from 'react';
import Circ from './Circ';
import CircleTransformer from './CircleTransformer';

// It imports 2 files from the same directory
// first is Circ.js which draws the circle
// second is CircleTransformer.js which transforms/modifies the circle

class DrawCircle extends React.Component {
    state = {
        circles: [],
        circleCount: 0,
        selectedShapeName: '',
        mouseDown: false,
        mouseDraw: false,
        newCircleX: 0,
        newCircleY: 0,
        i: 0,
    };

    // When mouse key is pressed down, the coordinates of the mouse gets stored in circles array

    handleStageMouseDown = (event) => {
        const { circles } = this.state;
        // clicked on stage - clear selection or ready to generate new rectangle
        if (event.target.className === 'Image') {
            const stage = event.target.getStage();
            const mousePos = stage.getPointerPosition();
            this.setState({
                mouseDown: true,
                newCircleX: mousePos.x,
                newCircleY: mousePos.y,
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
        const circ = circles.find(r => r.name === name);
        if (circ) {
            this.setState({
                selectedShapeName: name,
                circles,
            });
        } else {
            this.setState({
                selectedShapeName: '',
            });
        }
    };

    // When a properties of rectangle are changed i.e, transformation or annotated name is done, it then updates the circles array
    handleCircleChange = (index, newProps) => {
        const { circles } = this.state;
        circles[index] = {
            ...circles[index],
            ...newProps,
        };

        this.setState({ circles });
    };

    // when a new rectangle is drawn
    handleNewCircleChange = (event) => {
        const {
            circles, circleCount, newCircleX, newCircleY,
        } = this.state;
        const stage = event.target.getStage();
        //console.log('stage ', event.target);
        const mousePos = stage.getPointerPosition();    // get mouse position
        if (!circles[circleCount]) {
            circles.push({
                x: newCircleX,              //sets mouse position of x coordinate in the array
                y: newCircleY,              //sets mouse position of y coordinate in the array
                width: 2*Math.sqrt(Math.floor(Math.pow(mousePos.x - newCircleX, 2) + Math.pow(mousePos.y - newCircleY, 2))),     //sets width of the circle
                name: '',                   //deafult name the circle to empty: ''
                stroke: '#00A3AA',
            });
            return this.setState({ circles, mouseDraw: true });
        }
        circles[circleCount].width = 2*Math.floor(Math.sqrt(Math.pow(mousePos.x - newCircleX, 2) + Math.pow(mousePos.y - newCircleY, 2)));
        return this.setState({ circles });
    };


    //when mouse key is released up i.e, circle is drawn
    handleStageMouseUp = () => {
        var this1 = this;
        const { circleCount, mouseDraw } = this.state;
        const { circles, i } = this.state;
        if (mouseDraw) {
            this.setState({ circleCount: circleCount + 1, mouseDraw: false });
            var annotations = document.getElementById('annotate');
            var e1 = annotations.appendChild(document.createElement('input'));    // creating input field
            e1.className = 'fieldClass';
            e1.onchange = updateName;

            function updateName() {       //Local function to update name
                var value = this.value;
                console.log(value);
                this1.setState(Object.assign(this1.state.circles[i], { name: value }));
            }
            console.log(this1.state.circles);
            this.props.handleInput(this1.state.circles);
            //console.log(circles[i].name);
            this.setState({
                i: i + 1
            });
        }

        //console.log(this1.state.circles);
        this.setState({ mouseDown: false });
    };

    render() {
        const {
            state: { circles, selectedShapeName },
            handleCircleChange,
        } = this;
        return (

            <Fragment>
                {circles.map((circ, i) => (
                    <Circ id="annotate"
                        sclassName="circ"
                        key={circ.key}
                        {...circ}
                        onTransform={(newProps) => {
                            handleCircleChange(i, newProps);
                        }}

                    />
                ))}
                <CircleTransformer selectedShapeName={selectedShapeName} />

            </Fragment>


        );
    }
}

export default DrawCircle;
