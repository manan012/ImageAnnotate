import React, { Component, Fragment } from 'react';


class PolygonsAnnotaionName extends Component {
    render () {
        return  (
            <Fragment>
                <div className="p-1 bg-dark text-light">Polygons</div>
                {this.props.polygons.map((polygon, i) => (
                    <input key={i} type="text" value={polygon.name} onFocus={() => this.props.fillColor(i, '#007bff', 0.7)} onBlur={() =>this.props.fillColor(i, "", 1)} onChange={(e) => this.props.updateName(i, e.target.value)}/>
                ))}
            </Fragment>
        )
    }
}

export default PolygonsAnnotaionName;