import React, { Fragment } from 'react'
import {ValidatorComponent} from 'react-form-validator-core'
import { FormGroup, Input, FormFeedback } from 'reactstrap';

class LoginPageInput extends ValidatorComponent {
    render() {
        const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;
        const {isValid} = this.state;
        return (
            <Fragment>
                <input {...rest} invalid={!isValid} ref={(r) => { this.input = r; }}/>
                {this.errorText()}
            </Fragment>
        )
    }

    errorText() {
        const { isValid } = this.state;
        console.log("Valid: ", isValid);
        if (isValid) {
            return null;
        }
 
        return (
            <div style={{color: 'red'}}>
                {this.getErrorMessage()}
            </div>
        );
    }
}

export default LoginPageInput;