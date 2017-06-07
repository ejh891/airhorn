import React from 'react';
import Switch from 'react-bootstrap-switch';

const SyncSwitch = (props) => {
    return (
        <div style={{marginBottom: "30px"}}>
            <Switch 
                defaultValue={false}
                onChange={props.onChange}
            />
            <span style={{marginLeft: "5px"}}>Bababa together?</span>
        </div>
    )
}

export default SyncSwitch;
