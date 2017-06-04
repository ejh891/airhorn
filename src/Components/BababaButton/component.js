import React, { Component } from 'react';
import ReactHowler from 'react-howler';

import styles from './styles.js';

class BababaButton extends Component {
    state = {
        playing: false
    };

    handleClick = () => {
        this.setState({playing: true})
        this.props.incrementCounter();
    };

    audioOnEnd = () => {
        this.setState({playing: false});
        this.props.audioOnEnd();
    };

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
                    onClick={this.handleClick}/>
                </div>
                <ReactHowler src="/airhorn.mp3" html5={true} playing={this.state.playing} onPlay={this.props.audioOnStart} onEnd={this.audioOnEnd}/>
            </div>
        )
    }
}

export default BababaButton;
