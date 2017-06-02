import React, { Component } from 'react';
import axios from 'axios';
import BababaButton from '../BababaButton/component';
import BababaCounter from '../BababaCounter/component';
import BababaLogo from '../BababaLogo/component';

class App extends Component {
    state = {counter: 0};

    incrementCounter = () => {
        axios.post("http://localhost:3001/api/incrementCounter")
        .then(res => {
            this.setState( (prevState) => {
                return {counter: prevState.counter + 1};
            });
        });
    }

    subscribeToCounter = () => {
        axios.get("http://localhost:3001/api/subscribeToCounter")
        .then(res => {
            if (res.data !== undefined && res.data.count !== undefined) {
                this.setState({counter: res.data.count});
            }
            
            this.subscribeToCounter();
        });
    }

    componentDidMount() {
        axios.get("http://localhost:3001/api/readCounter")
        .then(res => {
            this.setState({counter: res.data.count});
        });

        this.subscribeToCounter();
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

export default App;
