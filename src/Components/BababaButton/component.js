import React, { Component } from 'react';

import styles from './styles.js';

class BababaButton extends Component {
    onClick = () => {
        this.props.audioPlay();
        this.props.incrementCounter();
    }
    render() {
        return(
            <div>
                <div id="action">
                    <input 
                        id="button" 
                        className="btn btn-success" 
                        style={styles.button} 
                        type="button" 
                        value="Bababa!" 
                        disabled={this.props.buttonDisabled}
                        onClick={this.onClick}
                    />
                </div>

            </div>
        )
    }
}

export default BababaButton;
