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
        this.setState({group: newGroup});
        this.readFeed(newGroup);
        this.subscribeToBababas(newGroup);
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
