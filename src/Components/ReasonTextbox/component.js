import React from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';

const ReasonTextbox = (props) => {
    return (
        <FormGroup bsSize={"lg"}>
            <FormControl
                style={{marginTop: "20px"}}
                value={props.reason}
                onChange={props.onChange}
                type="text"
                placeholder="Tell the world why you're bababa'ing"
            />
        </FormGroup>
        
    )
}

export default ReasonTextbox;
