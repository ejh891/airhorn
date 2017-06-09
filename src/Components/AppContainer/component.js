import React, { Component } from 'react';
import { SocketProvider } from 'socket.io-react'; 
import io from 'socket.io-client';

import App from '../App/component';

class AppContainer extends Component {
    socket = io.connect(this.props.apiServerRoot);

    state = {
        group: ""
    }

    onGroupChange = (newGroup) => {
        this.setState({group: newGroup});
    }

    componentWillMount() {
        if (!this.state.group) {
            let group = window.location.pathname.split('/')[1];
            if (group) {
                this.setState({group: group});
            }
        }
    }

    render() {
        return(
            <SocketProvider socket={this.socket}>
                <App apiServerRoot={this.props.apiServerRoot} group={this.state.group} onGroupChange={this.onGroupChange}/>
            </SocketProvider>
        )
    }
}

export default AppContainer;
