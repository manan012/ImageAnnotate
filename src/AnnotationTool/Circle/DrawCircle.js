import React, { Fragment } from 'react';
import Circ from './Circ';
import CircleTransformer from './CircleTransformer';

// rectangles   ->  circles
// rectCount    ->  circleCount

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

    // When a properties of rectangle are changed
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
                x: newCircleX,
                y: newCircleY,
                width: mousePos.x - newCircleX,
                name: '',
                stroke: '#00A3AA',
            });
            return this.setState({ circles, mouseDraw: true });
        }
        circles[circleCount].width = mousePos.x - newCircleX;
        return this.setState({ circles });
    };

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

                //this.state.circles[this.state.i].name = document.querySelector('input[className="fieldCLass"]');
                //this1.state.i = this1.state.i + 1;
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
