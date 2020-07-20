import React, { Fragment } from 'react';
import { Circle, Text } from 'react-konva';

class Circ extends React.Component {

    componentDidUpdate() {
        this.circ.getLayer().batchDraw();
        
    }

    handleClick = (event) => {
        console.log('clicked');
        this.props.selectNode(event.target);
    }

    handleChange = (event) => {
        const {
            props: { onTransform },
        } = this;
        const shape = event.target;
        
        // by default Transformer will change scaleX and scaleY
        // while transforming
        // so we need to adjust that properties to width and height
        onTransform({
            x: shape.x(),
            y: shape.y(),
            width: shape.width() * shape.scaleX(),
            rotation: shape.rotation(),
            radius: shape.radius(),
        });
    };

    //When mouse is over the circle, style of the cursor changes
    handleMouseEnter = (event) => {
        const shape = event.target;
        //console.log('shape', shape);
        shape.stroke('#3DF6FF');
        shape.getStage().container().style.cursor = 'move';
        this.circ.getLayer().batchDraw();
    };

    // When mouse leaves the circle, style of the cursor gets back to default
    handleMouseLeave = (event) => {
        const shape = event.target;
        shape.stroke('#00A3AA');
        shape.getStage().container().style.cursor = 'crosshair';
        this.circ.getLayer().batchDraw();
    };

    render() {
        const {
            props: {
                x,
                y,
                width,
                fill,
                opacity,
                name,
                stroke,
                strokeWidth,
                scaleX,
                scaleY
            },
            handleChange,
            handleMouseEnter,
            handleMouseLeave,
            handleClick
        } = this;
        return (
            <Fragment>
                <Circle x={x}
                    y={y}
                    width={width}
                    // force no scaling
                    // otherwise Transformer will change it
                    scaleX={1}
                    scaleY={1}
                    fill={fill}
                    opacity={opacity}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    name={name}
                    className="Circ"
                    id={this.props.id}
                    // save state on dragend or transformend
                    onDragEnd={handleChange}
                    onClick={handleClick}
                    onTransformEnd={handleChange}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    draggable ref={
                        (node) => {
                            this.circ = node;
                        }
                    }
                />
                
                <Text
                // Adds text on the circle
                    text={this.props.name}
                    x={this.props.x}
                    y={this.props.y}
                    offsetY={7}
                    // offsetX={this.props.name.length*15/5}
                    fill={'white'}
                    fontSize={'15'}
                />
            </Fragment>
        );
    }
}

export default Circ;