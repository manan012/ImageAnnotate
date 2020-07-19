import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdownOpen: false,
        }
    }

    dropDrownToggle = () => this.setState({dropdownOpen: !this.state.dropdownOpen});
    render() {
        return (
            <div className="list-item">
                <Link className="flex-grow-1 d-flex py-2 px-2" to={this.props.to}>
                    <div className="list-title flex-grow-1">
                        <div className="list-tiem-icon">
                            {this.props.title.split("")[0]}
                        </div>
                        <div className="list-item-text">
                            {this.props.title}
                        </div>
                    </div>
                    <div className="list-description">
                        <div className="list-item-status">
                            {
                                this.props.infos.map(info => <span className="label-count">{info}</span>)
                            }
                        </div>
                    </div>
                </Link>
                <div className="list-drop-down">
                    <div className="dropdown">
                        <button className="btn" type="button" onClick={this.dropDrownToggle} data-toggle="dropdown">
                            <i className="fas fa-ellipsis-v"></i>
                        </button>
                        <div className={"dropdown-menu " + (this.state.dropdownOpen ? "show" : "")}>
                            <a className="dropdown-item hov-red"
                            onClick={() => this.props.onDelete()}
                            >Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const matchDispatchToProp = (dispatch) => ({
    
})
export default connect(null, matchDispatchToProp)(ListItem);