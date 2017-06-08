import React from 'react';
import {ListGroup, ListGroupItem } from 'react-bootstrap';

const ReasonList = (props) => {
    return (
        <ListGroup style={{marginTop: "20px"}}>
                {props.messages.map( (message) => <ListGroupItem>{message}</ListGroupItem>)}
        </ListGroup>
    )
}

export default ReasonList;