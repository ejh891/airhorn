import React from 'react';
import styles from './styles.js';

const BababaButton = (props) => {
    return(
        <div>
            <div id="action">
                <input 
                    id="button" 
                    className="btn btn-success" 
                    style={styles.button} 
                    type="button" 
                    value="Bababa!" 
                    disabled={props.buttonDisabled}
                    onClick={() => {props.audioPlay(); props.incrementCounter();}}
                />
            </div>
        </div>
    )
}

export default BababaButton;
