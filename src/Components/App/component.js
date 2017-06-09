/*eslint-disable no-console */
import React, { Component } from 'react';

import { socketConnect } from 'socket.io-react';

import { Grid, Row, Col } from 'react-bootstrap';
import BababaButton from '../BababaButton/component';
import ReactHowler from 'react-howler';
import ReasonTextbox from '../ReasonTextbox/component';
import BababaFeed from '../BababaFeed/component';
import GroupManager from '../GroupManager/component';

class App extends Component {
    state = {
        playing: this.props.playing,
        reason: ""
    };

// button events
    buttonOnClick = () => {
        this.props.playAudio();
        
        let data = {};
        if (this.props.group && this.state.reason.length > 0) {
            data.message = this.state.reason;
            data.group = this.props.group;
        }

        this.props.socket.emit('bababa', data);

        this.setState({reason: ""})
    }

// reason textbox events
    reasonOnChange = (e) => {
        this.setState({reason: e.target.value});
    }

// audio events
    audioOnEnd = () => {
        this.props.stopAudio();
    }

    render() {
        return(
            <Grid>
                <Row style={{marginBottom: "40px"}}>
                    <Col xs={12}>
                        <GroupManager groupName={this.props.group} onGroupChange={this.props.onGroupChange}/>
                    </Col>
                </Row>
                <Row style={{marginBottom: "20px"}} className={this.props.group ? "" : "hidden"}>
                    <Col xs={12}>
                        <ReasonTextbox 
                            value={this.state.reason} 
                            onChange={this.reasonOnChange}
                        />
                    </Col>
                </Row>       
                <Row style={{marginBottom: "40px"}}>
                    <Col xs={12}>
                        <BababaButton 
                            onClick={this.buttonOnClick}
                            buttonDisabled={this.props.playing}
                        />
                    </Col>
                </Row>
                <Row className={this.props.group ? "" : "hidden"}>
                    <Col xs={12}>
                        <h2>{this.props.group + " Bababas"}</h2>
                        <BababaFeed messages={this.props.messages}/>
                    </Col>
                </Row>
                <ReactHowler 
                    src="/airhorn.mp3" 
                    html5={true} 
                    playing={this.props.playing} 
                    onPlay={this.audioOnStart} 
                    onEnd={this.audioOnEnd}
                />
            </Grid>
        )
    }
}

export default socketConnect(App);
