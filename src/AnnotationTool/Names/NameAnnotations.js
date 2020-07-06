import React, { Component, Fragment } from 'react';
import RectangleAnnotationName from './RectangleAnnotationName';
import CircleAnnotationName from './CircleAnnotationName';
import { keys, compose } from 'ramda';
import AnnotationNameDisplay from './LineAnnotaionsName';
import LinesAnnotationName from './LineAnnotaionsName';
import PolygonsAnnotaionName from './PolygonAnnotationName';

class NameAnnotations extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Fragment>
                <div className="ann p-2 text-center">
                    <h4 className="m-0">Annotations</h4>
                </div>
                <div className="mb-1">
                    {
                        this.props.annotations.lines && this.props.annotations.lines.length > 0?
                        <LinesAnnotationName 
                        lines={this.props.annotations.lines} 
                        updateName={(i, name) => this.props.updateLine(i, {name: name})}
                        strokeColor={(i, color) => this.props.updateLine(i, {stroke: color})}
                        /> :
                        null
                    }
                </div>
                <div className="mb-1">
                    {
                        this.props.annotations.rectangles && this.props.annotations.rectangles.length > 0?
                        <RectangleAnnotationName 
                        rectangles={this.props.annotations.rectangles} 
                        updateName={(i, name) => this.props.updateRectangle(i, {name: name})}
                        fillColor={(i, color) => this.props.updateRectangle(i, {fill: color, opacity: 0.7})}
                        /> :
                        null
                    }
                </div>
                <div className="mb-1">
                    {
                        this.props.annotations.circles && this.props.annotations.circles.length > 0 ?
                        <CircleAnnotationName
                            circles={this.props.annotations.circles ? this.props.annotations.circles: []}
                            updateName={(i, name) => this.props.updateCircle(i, {name: name})}
                            fillColor={(i, color, opacity) => this.props.updateCircle(i, {fill: color, opacity: opacity})}
                        /> :
                        null
                    }
                </div>
                <div className="mb-1">
                    {
                        this.props.annotations.polygons && this.props.annotations.polygons.length > 0 ?
                        <PolygonsAnnotaionName
                            polygons={this.props.annotations.polygons}
                            updateName={(i, name) => this.props.updatePolygon(i, {name: name})}
                            fillColor={(i, color, opacity) => this.props.updatePolygon(i, {fill: color, opacity: opacity})}
                        /> :
                        null
                    }
                </div>
            </Fragment>
        )
    }
}

export default NameAnnotations;
