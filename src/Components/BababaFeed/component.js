import React from 'react';
import {ListGroup, ListGroupItem } from 'react-bootstrap';

const BababaFeed = (props) => {
    return (
        <ListGroup style={{marginTop: "20px"}}>
                {props.messages.map( (message, i) => <ListGroupItem key={i}>{message.message}</ListGroupItem>)}
        </ListGroup>
    )
}

export default BababaFeed;