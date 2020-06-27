import React, { Component, Fragment } from 'react';
import RectangleAnnotationName from './RectangleAnnotationName';
import CircleAnnotationName from './CircleAnnotationName';

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
                        this.props.annotations.rectangles && this.props.annotations.rectangles.length > 0?
                        <RectangleAnnotationName 
                        rectangles={this.props.annotations.rectangles} 
                        updateName={(i, name) => this.props.updateRectangle(i, {name: name})}
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
                        /> :
                        null
                    }
                </div>
            </Fragment>
        )
    }
}

export default NameAnnotations;
