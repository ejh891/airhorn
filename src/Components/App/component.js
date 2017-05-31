import React, { Component } from 'react';
import BababaButton from '../BababaButton/component';
import BababaCounter from '../BababaCounter/component';
import BababaLogo from '../BababaLogo/component';

class App extends Component {
    state = {counter: 0}
    incrementCounter = () => {
        this.setState( (prevState) => {
            return {counter: prevState.counter + 1};
        });
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <BababaButton handleClick={this.incrementCounter}/>
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
