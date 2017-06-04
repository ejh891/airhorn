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

    onAudioStart = () => {
        document.getElementById("button").disabled = true;
    }

    onAudioEnd = () => {
        document.getElementById("button").disabled = false;
    }

    render() {
        return(
            <div>
                <div id="action">
                    <input id="button" className="btn btn-success" style={styles.button} type="button" value="Bababa!" onClick={this.handleClick}/>
                </div>
                <ReactHowler src="/airhorn.mp3" html5={true} playing={this.state.playing} onPlay={this.onAudioStart} onEnd={this.onAudioEnd}/>
            </div>
        )
    }
}

export default BababaButton;
