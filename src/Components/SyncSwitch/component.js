import React from 'react';
import Switch from 'react-bootstrap-switch';

const SyncSwitch = (props) => {
    return (
        <div>
            <Switch defaultValue={false} onChange={props.switchOnChange}/>
            <span style={{marginLeft: "5px"}}>Bababa Together?</span>
        </div>
    )
}

export default SyncSwitch;
