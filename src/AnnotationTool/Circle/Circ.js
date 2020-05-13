import React, { Fragment } from 'react';
import { Circle, Text } from 'react-konva';

class Circ extends React.Component {

    componentDidUpdate() {
        this.rect.getLayer().draw();
        //console.log(this.rect.getLayer().draw());
        
    }

    handleChange = (event) => {
        const {
            props: { onTransform },
        } = this;
        const shape = event.target;
        //console.log(shape.radius());
        
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

    handleMouseEnter = (event) => {
        const shape = event.target;
        //console.log('shape', shape);
        shape.stroke('#3DF6FF');
        shape.getStage().container().style.cursor = 'move';
        // this.rect.draw();
        this.rect.getLayer().draw();
    };

    handleMouseLeave = (event) => {
        const shape = event.target;
        shape.stroke('#00A3AA');
        shape.getStage().container().style.cursor = 'crosshair';
        // this.rect.draw();
        this.rect.getLayer().draw();
    };

    render() {
        const {
            props: {
                x,
                y,
                width,
                
                name,
                stroke,
            },
            handleChange,
            handleMouseEnter,
            handleMouseLeave,
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
                    stroke={stroke}
                    strokeWidth={2}
                    name={name}
                    
                    
                    // save state on dragend or transformend
                    onDragEnd={handleChange}
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
                    text={this.props.name}
                    x={this.props.x}
                    y={this.props.y}
                    fill={'white'}
                    fontSize={'15'}
                />
            </Fragment>
        );
    }
}

export default Circ;