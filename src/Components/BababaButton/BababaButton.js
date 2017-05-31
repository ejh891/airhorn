import React, { Component } from 'react';

class BababaButton extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <div id="action">
                <input id="button" class="btn btn-success" type="button" value="Bababa!" />
            </div>
        )
    }
}

export default BababaButton;
