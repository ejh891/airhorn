import React from 'react';
import classnames from 'classnames';
import styles from './styles.js';

const MuteButton = (props) => {
    let buttonClasses = {
        "glyphicon": true,
        "glyphicon-volume-off": props.muteStatus,
        "glyphicon-volume-up": !props.muteStatus,
        "active": props.muteStatus
    };

    return (
        <div style={styles.muteButtonContainer}>
            <button style={styles.muteButton} className="btn btn-lg btn-default" onClick={props.onClick}>
                <span style={styles.muteIcon} className={classnames(buttonClasses)}></span>
            </button>
        </div>
    )
}

export default MuteButton;
