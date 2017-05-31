import React, { Component } from 'react';
import BababaButton from '../BababaButton/BababaButton';
import BababaCounter from '../BababaCounter/BababaCounter';
import BababaLogo from '../BababaLogo/BababaLogo';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <BababaButton />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <BababaCounter />
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
