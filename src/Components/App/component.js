/*eslint-disable no-console */
import React, { Component } from 'react';

import axios from 'axios';
import { socketConnect } from 'socket.io-react';

import { Grid, Row, Col } from 'react-bootstrap';
import BababaButton from '../BababaButton/component';
import Counter from '../Counter/component';
import MuteButton from '../MuteButton/component';
import ReactHowler from 'react-howler';
import SyncSwitch from '../SyncSwitch/component';
import ReasonTextbox from '../ReasonTextbox/component';
import ReasonList from '../ReasonList/component';

class App extends Component {
    state = {
        counter: 0,
        playing: false,
        mute: true,
        synced: false,
        reason: "",
        messages: []
    };

// shared methods
    incrementCounter = () => {
        let data = {};
        if (this.state.synced && this.state.reason.length > 0) {
            data.message = this.state.reason;
        }
        this.props.socket.emit('incrementCounter', data);
        this.setState((prevState) => {
            return {counter: prevState.counter + 1};
        });
    }

    playAudio = () => {
        this.setState({playing: true});
    }
    
    stopAudio = () => {
        this.setState({playing: false});
    }

// button events
    buttonOnClick = () => {
        this.playAudio();
        this.incrementCounter();
        this.setState({reason: ""})
    }
// switch events
    switchOnChange = () => {
        this.setState((prevState) => {
            return {synced: !prevState.synced}
        });
    }

// reason textbox events
    reasonOnChange = (e) => {
        this.setState({reason: e.target.value});
    }

// audio events
    audioOnEnd = () => {
        this.stopAudio();
    }

// mute events
    muteOnClick = () => {
        this.setState( (prevState) => {
            return {mute: !prevState.mute}
        });
    };

// lifecycle methods
    componentDidMount() {
        axios.get(this.props.apiServerRoot + "/api/readCounter")
        .then((res) => {
            this.setState({counter: res.data.count});
        });

        this.props.socket.on('updatedCount', (data) => {
            this.setState((prevState) => {
                let newState = {};
                newState.counter = data.count;
                if (prevState.synced) {
                    newState.playing = true
                }
                if (data.message) {
                    newState.messages = prevState.messages.concat([data.message])
                }
                return newState;
            });
        });
    }
    
    render() {
        return(
            <Grid>
                <Row>
                    <Col xs={12}>
                        <div>
                            <span className={"pull-left"}>
                                <SyncSwitch 
                                    state={this.state.synced}
                                    onChange={this.switchOnChange}
                                />
                            </span>
                            <span className={"pull-right"}>
                                <MuteButton onClick={this.muteOnClick} muteStatus={this.state.mute}/>
                            </span>
                        </div>

                    </Col>
                </Row>
                <Row className={this.state.synced ? "" : "hidden"}>
                    <Col xs={12}>
                        <ReasonTextbox 
                            value={this.state.reason} 
                            onChange={this.reasonOnChange}
                        />
                    </Col>
                </Row>       
                <Row>
                    <Col xs={12}>
                        <BababaButton 
                            onClick={this.buttonOnClick}
                            buttonDisabled={this.state.playing || this.state.mute}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Counter count={this.state.counter}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <ReasonList messages={this.state.messages}/>
                    </Col>
                </Row>
                <ReactHowler 
                    src="/airhorn.mp3" 
                    html5={true} 
                    playing={this.state.playing} 
                    onPlay={this.audioOnStart} 
                    onEnd={this.audioOnEnd}
                    mute={this.state.mute}
                />
            </Grid>
        )
    }
}

export default socketConnect(App);
