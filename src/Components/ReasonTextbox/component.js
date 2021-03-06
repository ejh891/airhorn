import React from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';

const ReasonTextbox = (props) => {
    return (
        <FormGroup bsSize={"lg"}>
            <FormControl
                style={{marginTop: "20px"}}
                value={props.value}
                onChange={props.onChange}
                type="text"
                placeholder="Tell the group why you're bababa'ing"
            />
        </FormGroup>
        
    )
}

export default ReasonTextbox;
