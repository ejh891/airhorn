import React, { Component } from 'react';
import styles from './styles.css';

class BababaCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <div id="count" className={styles.count}>Counter</div>
        )
    }
}

export default BababaCounter;
