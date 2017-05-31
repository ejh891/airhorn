import React, { Component } from 'react';
import styles from './styles.css';

class BababaButton extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <div id="action">
                <input id="button" className={"btn btn-success " + styles.button} type="button" value="Bababa!" onClick={this.props.handleClick}/>
            </div>
        )
    }
}

export default BababaButton;
