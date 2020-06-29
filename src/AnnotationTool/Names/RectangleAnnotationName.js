import React, { Component, Fragment } from 'react';


class RectangleAnnotationName extends Component {
    render () {
        return  (
            <Fragment>
                <div className="p-1 bg-dark text-light">Rectangle</div>
                {this.props.rectangles.map((rect, i) => (
                    <input key={i} type="text" value={rect.name} onChange={(e) => this.props.updateName(i, e.target.value)}/>
                ))}
            </Fragment>
        )
    }
}

export default RectangleAnnotationName;