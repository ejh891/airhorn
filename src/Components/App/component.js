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

class App extends Component {
    state = {
        counter: 0,
        buttonDisabled: false,
        playing: false,
        mute: true,
        synced: false
    };
    
    incrementCounter = () => {
        this.props.socket.emit('incrementCounter');
        this.setState((prevState) => {
            return {counter: prevState.counter + 1};
        });
    }

    switchOnChange = () => {
        this.setState((prevState) => {
            return {synced: !prevState.synced}
        });
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
            this.setState((prevState) => {
                return {counter: count, playing: prevState.synced}
            });
        });
    }
    
    render() {
        return(
            <Grid>
                <Row>
                    <Col xs={12}>
                        <SyncSwitch state={this.state.synced} onChange={this.switchOnChange}/>
                    </Col>
                </Row>
                <Row className={this.state.synced ? "" : "hidden"}>
                    <Col xs={12}>
                        <ReasonTextbox />
                    </Col>
                </Row>       
                <Row>
                    <Col xs={12}>
                        <BababaButton 
                            incrementCounter={this.incrementCounter}
                            audioPlay={this.audioPlay}
                            buttonDisabled={this.state.buttonDisabled || this.state.mute}
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
                        <MuteButton onClick={this.muteOnClick} muteStatus={this.state.mute}/>
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
