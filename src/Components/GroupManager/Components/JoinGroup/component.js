import React from 'react';
import { Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

const JoinGroup = (props) => {
    return (
        <div>
            <FormGroup>
                <InputGroup>
                    <FormControl
                        value={props.textboxValue}
                        onChange={props.textboxOnChange}
                        type="text"
                        placeholder="Start or join a group by picking a name here"
                    />
                    <InputGroup.Button>
                        <Button
                            bsStyle={"primary"}
                            onClick={props.buttonOnClick}
                        >
                            Join
                        </Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        </div>
    )
}

export default JoinGroup;