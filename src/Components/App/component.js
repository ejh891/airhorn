import React, { Component } from 'react';

import axios from 'axios';
import { socketConnect } from 'socket.io-react';

import BababaButton from '../BababaButton/component';
import BababaCounter from '../BababaCounter/component';
import BababaLogo from '../BababaLogo/component';

class App extends Component {
    state = {counter: 0};
    
    incrementCounter = () => {
        axios.post("/api/incrementCounter")
    }

    componentDidMount() {
        axios.get("/api/readCounter")
        .then((res) => {
            this.setState({counter: res.data.count});
        });

        this.props.socket.on('updatedCount', (count) => {
            this.setState({counter: count});
        });
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <BababaButton incrementCounter={this.incrementCounter}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <BababaCounter count={this.state.counter}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <BababaLogo />
                    </div>
                </div>
            </div>
        )
    }
}

export default socketConnect(App);
