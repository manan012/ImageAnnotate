import React, { Component } from "react";
import { Stage, Layer, Group, Line, Rect } from "react-konva";

class CustomeLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            points: this.props.points,
            x: 0,
            y: 0,
            pointMoving: false,
            closed: this.props.closed || false,
        };
    }

  handleDragMovePoint = event => {
    const points = this.state.points;
    const index = event.target.index - 1;
    console.log(event.target);
    const pos = [event.target.attrs.x, event.target.attrs.y];
    console.log("move", event);
    console.log(pos);
    this.setState({
      pointMoving: true,
      points: [...points.slice(0, index), pos, ...points.slice(index + 1)]
    });
  };

  handleDragEnd = (e) => {
      e.target.setAttr('points', this.state.points);
      if (this.state.pointMoving) {
        this.setState({pointMoving: false});
      } else {
        this.setState({x: e.target.attrs.x, y: e.target.attrs.y});
      }
      this.props.onDragEnd && this.props.onDragEnd(e);
  }

  handlePointDragEnd = (e) => {
    this.props.onTransFormEnd && this.props.onTransFormEnd(this.state.points);
  }

  render() {
    const {
      state: { points, x, y, closed },
      props: {transformerOn, selectNode, stroke, fill, strokeWidth, opacity},
      handleDragMovePoint,
    } = this;
    const flattenedPoints = points
      .reduce((a, b) => a.concat(b), []);
    return (
        <Group x={x} y={y} draggable onDragEnd={this.handleDragEnd} onCLick={() => selectNode && selectNode()}>
          <Line
            points={flattenedPoints}
            strokeWidth={strokeWidth}
            stroke={stroke}
            fill={fill}
            opacity={opacity}
            closed={this.state.closed}
          />
          {transformerOn && points.map((point, index) => {
            const width = 6;
            const x = point[0] - width / 2;
            const y = point[1] - width / 2;
            return (
              <Rect
                className="Line"
                key={index}
                x={x}
                y={y}
                width={width}
                height={width}
                fill="white"
                stroke="#00A3AA"
                strokeWidth={3}
                onDragMove={this.handleDragMovePoint}
                onDragEnd={this.handlePointDragEnd}
                draggable
              />
            );
          })}
        </Group>
    );
  }
}

export default CustomeLine
