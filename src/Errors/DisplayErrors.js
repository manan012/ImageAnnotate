import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CustomAlert } from './Alert';

export class DisplayErrors extends Component {
    render() {
        return (
            <div style={{position: 'absolute', right: 0, top: "50px", zIndex: 100}}>
                {
                    this.props.errors.map(error => (
                        <CustomAlert error={error} remove={() => this.props.removeError(error)} />
                    ))
                }
            </div>
        )
    }
}

const matchStateToProps = (state) => ({
    errors: state.errors.errors,
})

const matchDispathToProps = (dispatch) => ({
    removeError: (error) => dispatch({type: "REMOVE_ERROR", error})
})

export default connect(matchStateToProps, matchDispathToProps)(DisplayErrors);
