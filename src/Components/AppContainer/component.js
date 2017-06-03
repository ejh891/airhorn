import React, { Component } from 'react';
import { SocketProvider } from 'socket.io-react'; 
import io from 'socket.io-client';

import App from '../App/component';

class AppContainer extends Component {
    socket = io.connect();

    ComponentDidMount() {
        this.socket.on('message', function(message) {
            console.log(message);
        });
    }

    render() {
        return(
            <SocketProvider socket={this.socket}>
                <App />
            </SocketProvider>
        )
    }
}

export default AppContainer;
