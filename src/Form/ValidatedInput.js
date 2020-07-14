import React from 'react'
import {ValidatorComponent} from 'react-form-validator-core'
import { FormGroup, Input, FormFeedback } from 'reactstrap';

class ValidatedInput extends ValidatorComponent {
    render() {
        const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;
        const {isValid} = this.state;
        return (
            <FormGroup>
                <Input {...rest} invalid={!isValid} ref={(r) => { this.input = r; }}/>
                {this.errorText()}
            </FormGroup>
        )
    }

    errorText() {
        const { isValid } = this.state;
        console.log("Valid: ", isValid);
        if (isValid) {
            return null;
        }
 
        return (
            <div class="invalid-feedback">
                {this.getErrorMessage()}
            </div>
        );
    }
}

export default ValidatedInput;