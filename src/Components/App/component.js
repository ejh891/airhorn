import React, { Component } from 'react';

import axios from 'axios';
import { socketConnect } from 'socket.io-react';

import BababaButton from '../BababaButton/component';
import Counter from '../Counter/component';
import MuteButton from '../MuteButton/component';
import ReactHowler from 'react-howler';

class App extends Component {
    state = {
        counter: 0,
        buttonDisabled: false,
        playing: false,
        mute: true
    };
    
    incrementCounter = () => {
        axios.post("/api/incrementCounter")
    }

    audioPlay = () => {
        this.setState({playing: true});
    }

    audioOnStart = () => {
        this.setState({buttonDisabled: true});
    }

    audioOnEnd = () => {
        this.setState({buttonDisabled: false, playing: false});
    }

    muteOnClick = () => {
        this.setState( (prevState) => {
            return {mute: !prevState.mute}
        });
    };

    componentDidMount() {
        axios.get("/api/readCounter")
        .then((res) => {
            this.setState({counter: res.data.count});
        });

        this.props.socket.on('updatedCount', (count) => {
            this.setState({counter: count, playing: true});
        });
    }

    render() {
        return(
            <div className="container" style={{"margin-top": "10px"}}>
                <div className="row">
                    <div className="col-sm-12">
                        <BababaButton 
                            incrementCounter={this.incrementCounter}
                            audioPlay={this.audioPlay}
                            buttonDisabled={this.state.buttonDisabled || this.state.mute}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <Counter count={this.state.counter}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <MuteButton onClick={this.muteOnClick} muteStatus={this.state.mute}/>
                    </div>
                </div>
                <ReactHowler 
                    src="/airhorn.mp3" 
                    html5={true} 
                    playing={this.state.playing} 
                    onPlay={this.audioOnStart} 
                    onEnd={this.audioOnEnd}
                    mute={this.state.mute}
                />
            </div>
        )
    }
}

export default socketConnect(App);
