import React, { Component, Fragment } from 'react';
import { Transformer } from 'react-konva';
import CustomeLine from './Line';
import { flatten } from 'ramda';

class DisplayLines extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
    }

    handleChange = (i, event) => {
        console.log(i, event);
        const target = event.target;
        const [[a, b], [c, d]] = target.attrs.points
        const {x, y} = target.attrs;
        console.log([a+x, b+y], [c+x, d+y])
        this.props.updateLine(i, 
            {
                point1: [a+x, b+y],
                point2: [c+x, d+y]
            }
        )
    }

    handleTransformation = (i, points) => {
        this.props.updateLine(i, {point1: points[0], point2: points[1]})
    }

    render () {
        return (
            <Fragment>
            {
                // this.props.lines.map((line, i) => {
                //     console.log(line);
                //     return <Line x={0} y={0} key={i} id={i}
                //     draggable
                //     onDragEnd={e => this.handleChange(i, e)}
                //     onClick={e=>this.props.selectNode(e.target)} 
                //     onTransformEnd={this.handleTransformation}
                //     points={[...line.point1, ...line.point2]} 
                //     stroke={line.stroke} 
                //     strokeWidth={line.strokeWidth} />
                // })
                this.props.lines.map((line, i) => {
                    console.log(line)
                    return <CustomeLine selectNode={() => this.props.selectNode(i)} 
                            transformerOn={this.props.selectedNode===i} 
                            points={[line.point1, line.point2]} 
                            onDragEnd={(e) => this.handleChange(i, e)}
                            stroke={line.stroke} 
                            strokeWidth={line.strokeWidth}
                            onTransFormEnd={(points) => this.handleTransformation(i, points)} />
                })
            }
            </Fragment>
        )
    }
}

export default DisplayLines;