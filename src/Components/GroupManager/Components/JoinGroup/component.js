import React from 'react';
import { Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

const JoinGroup = (props) => {
    return (
        <div>
            <FormGroup bsSize={"lg"}>
                <InputGroup>
                    <FormControl
                        value={props.textboxValue}
                        onChange={props.textboxOnChange}
                        onKeyPress={props.textboxOnKeyPress}
                        type="text"
                        placeholder="Group name"
                    />
                    <InputGroup.Button>
                        <Button
                            bsStyle={"primary"}
                            bsSize={"lg"}
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