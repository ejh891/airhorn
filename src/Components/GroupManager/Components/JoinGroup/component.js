import React from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

const JoinGroup = (props) => {
    return (
        <div>
            <FormGroup>
                <FormControl
                    value={props.textboxValue}
                    onChange={props.textboxOnChange}
                    type="text"
                    placeholder="Start or join a group by picking a name here"
                />
            </FormGroup>
            <Button bsStyle={"primary"} onClick={props.buttonOnClick}>Join</Button>
        </div>
    )
}

export default JoinGroup;