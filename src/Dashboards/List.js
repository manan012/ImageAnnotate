import React, { Component } from 'react';


class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"list w-100 " + this.props.className ? this.props.className : ""}>
                {this.props.children}
            </div>
        )
    }
}

export default List;