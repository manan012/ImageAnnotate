import React, { Component, Fragment } from 'react';


class LinesAnnotationName extends Component {
    render () {
        return  (
            <Fragment>
                <div className="p-1 bg-dark text-light">Lines</div>
                {this.props.lines.map((line, i) => (
                    <input key={i} type="text" value={line.name} onFocus={() => this.props.strokeColor(i, '#007bff')} onBlur={() =>this.props.strokeColor(i, "#00A3AA")} onChange={(e) => this.props.updateName(i, e.target.value)}/>
                ))}
            </Fragment>
        )
    }
}

export default LinesAnnotationName;