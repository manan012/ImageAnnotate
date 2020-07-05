import React, { Component, Fragment } from 'react';
import { Line } from 'react-konva';
import { splitEvery, flatten } from 'ramda';
import CustomeLine from '../Line/Line';

class DrawPolygons extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (i, points) => {
        this.props.updatePolygon(i, {points: flatten(points)});
    } 

    handleDrag = (i, event) => {
        const points = event.target.attrs.points;
        const {x, y} = event.target.attrs;
        console.log(x, y);
        this.props.updatePolygon(i, {points: flatten(points.map(([a, b]) => ([a+x, b+y])))});
    }

    render () {
        return (
            <Fragment>
                {
                    this.props.polygons.map((poly, i) => {
                        return <CustomeLine transformerOn={this.props.selectedNode === i} 
                            selectNode={()=>this.props.selectNode(i)}
                            points={splitEvery(2, poly.points)} closed={true} 
                            onDragEnd={(event) => this.handleDrag(i, event)} onTransFormEnd={(points) => this.handleChange(i, points)}/>
                    })
                }
            </Fragment>
        )
    }
}

export default DrawPolygons;