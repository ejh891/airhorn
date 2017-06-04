import React, { Component } from 'react';
import styles from './styles.js';

class BababaCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <div id="count" style={styles.count}>{this.props.count}</div>
        )
    }
}

export default BababaCounter;
