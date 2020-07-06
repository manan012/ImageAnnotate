import React, { Component, Fragment } from 'react';


class CircleAnnotationName extends Component {
    render () {
        return  (
            <Fragment>
                <div className="p-1 bg-dark text-light">Circle</div>
                {this.props.circles.map((cir, i) => (
                    <input key={i} type="text" value={cir.name} onFocus={() => this.props.fillColor(i, '#007bff', 0.7)} onBlur={() =>this.props.fillColor(i, "", 1)} onChange={(e) => this.props.updateName(i, e.target.value)}/>
                ))}
            </Fragment>
        )
    }
}

export default CircleAnnotationName;