import React from 'react';
import { Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Switch from 'react-bootstrap-switch';

const SyncSwitch = (props) => {
    const tooltip = (
        <Tooltip id="tooltip">Everyone on the app will get your bababas and shout-outs, and you'll get theirs!</Tooltip>
    );
    return (
        <div style={{marginBottom: "30px"}}>
            <Switch 
                defaultValue={false}
                onChange={props.onChange}
            />
            <span style={{marginLeft: "5px"}}>Bababa together?</span>
            <OverlayTrigger placement="bottom" overlay={tooltip}>
                <Glyphicon style={{fontSize: "15pt", marginLeft: "5px"}}glyph="info-sign" />
            </OverlayTrigger>
        </div>
    )
}

export default SyncSwitch;
