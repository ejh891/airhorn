import React, { Component } from 'react';
import { SocketProvider } from 'socket.io-react'; 
import io from 'socket.io-client';
import axios from 'axios';

import App from '../App/component';

class AppContainer extends Component {
    socket = io.connect(this.props.apiServerRoot);

    state = {
        group: "",
        messages: [],
        playing: false
    }

    getQueryParameterByName = (name, url) => {
        if (!url) url = window.location.href;
        name = name.replace(/[[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    playAudio = () => {
        this.setState({playing: true});
    }
    
    stopAudio = () => {
        this.setState({playing: false});
    }

    readFeed = (group) => {
        axios.get(this.props.apiServerRoot + "/api/readFeed/" + encodeURIComponent(group))
        .then( (res) => {
            this.setState({messages: res.data.messages});
        });
    }

    subscribeToBababas = (group) => {
        this.socket.removeAllListeners();
        if (!group) {
            return;
        }

        this.socket.on('bababa-' + group, (data) => {
            this.setState((prevState) => {
                let newState = {};
                
                newState.playing = true
                
                if (data.message) {
                    newState.messages = [
                        {
                            message: data.message,
                            group: group,
                            createdUts: Math.floor(Date.now() / 1000)
                        }
                    ].concat(prevState.messages)
                }
                return newState;
            });
        });
    }

    onGroupChange = (newGroup) => {
        if (newGroup !== this.state.group) {
            this.setState({group: newGroup});
            this.readFeed(newGroup);
            this.subscribeToBababas(newGroup);
        }
    }

    componentWillMount() {
        let group = this.getQueryParameterByName('group');
        if (group) {
            this.onGroupChange(group);
        }
    }

    render() {
        return(
            <SocketProvider socket={this.socket}>
                <App 
                    group={this.state.group} 
                    onGroupChange={this.onGroupChange} 
                    messages={this.state.messages}
                    playing={this.state.playing}
                    playAudio={this.playAudio}
                    stopAudio={this.stopAudio}
                />
            </SocketProvider>
        )
    }
}

export default AppContainer;
