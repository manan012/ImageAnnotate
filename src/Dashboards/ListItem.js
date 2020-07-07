import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteProject } from "../sagas/projectSagas";

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
                <div className="list-title">
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
                    <div className="list-drop-down">
                        <div className="dropdown">
                            <button className="btn" type="button" onClick={this.dropDrownToggle} data-toggle="dropdown">
                                <i className="fas fa-ellipsis-v"></i>
                            </button>
                            <div className={"dropdown-menu " + (this.state.dropdownOpen ? "show" : "")}>
                                <a className="dropdown-item"
                                 onClick={() => this.props.deleteProject(this.props.id)}
                                >Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const matchDispatchToProp = (dispatch) => ({
    deleteProject: (id) => dispatch({type: 'DELETE_PROJECT', id: id})
})
export default connect(null, matchDispatchToProp)(ListItem);