import React, { Fragment } from 'react';
import { Rect, Text } from 'react-konva';

class Rectangle extends React.Component {

    componentDidUpdate() {
        this.rect.getLayer().batchDraw();
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
            height: shape.height() * shape.scaleY(),
            rotation: shape.rotation()
        });
    };

    // MOuse over on rectangle
    handleMouseEnter = (event) => {
        const shape = event.target;
        shape.stroke('#3DF6FF');
        shape.getStage().container().style.cursor = 'move';
        this.rect.getLayer().batchDraw();
    };

    //When mouse is leaved from rectangle
    handleMouseLeave = (event) => {
        const shape = event.target;
        shape.stroke('#00A3AA');
        shape.getStage().container().style.cursor = 'crosshair';
        this.rect.getLayer().batchDraw();
    };

    handleClick = (event) => {
        console.log(event)
        this.props.selectNode(event.target);
    }

    render() {
        const {
            props: {
                x,
                y,
                width,
                height,
                name,
                stroke,
                scaleX,
                scaleY,
                fill,
                opacity
            },
            handleChange,
            handleClick,
            handleMouseEnter,
            handleMouseLeave,
        } = this;
        return (
            <Fragment>
                <Rect x={x*scaleX}
                    y={y*scaleY}
                    width={width*scaleX}
                    height={height*scaleX}
                    // force no scaling
                    // otherwise Transformer will change it
                    scaleX={1}
                    scaleY={1}
                    stroke={stroke}
                    fill={fill}
                    id={this.props.id}
                    opacity={opacity}
                    strokeWidth={5}
                    name={name}
                    className="Rect"
                    // save state on dragend or transformend
                    onDragEnd={handleChange}
                    onClick={handleClick}
                    onTransformEnd={handleChange}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    draggable ref={
                        (node) => {
                            this.rect = node;
                        }
                    }
                />
                <Text
                // Text on rectangle when annotating name is done
                    text={this.props.name}
                    x={ (this.props.x + this.props.width/2)*scaleX}
                    y={ (this.props.y + this.props.height/2)*scaleY}
                    offsetY={7}
                    offsetX={this.props.name.length*15/5}
                    fill={'white'}
                    fontSize={'15'}
                    align={'center'}
                />
            </Fragment>
        );
    }
}

export default Rectangle;