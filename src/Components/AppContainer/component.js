import React, { Component } from 'react';
import { SocketProvider } from 'socket.io-react'; 
import io from 'socket.io-client';

import App from '../App/component';

class AppContainer extends Component {
    socket = io.connect(this.props.apiServerRoot);

    render() {
        return(
            <SocketProvider socket={this.socket}>
                <App apiServerRoot={this.props.apiServerRoot}/>
            </SocketProvider>
        )
    }
}

export default AppContainer;
