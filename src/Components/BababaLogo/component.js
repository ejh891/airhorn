import React, { Component } from 'react';
import styles from './styles.css';

class BababaLogo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <div id="logo" className={styles.logo}>
                <img alt="logo" src="/apple-touch-icon.png" />
            </div>
        )
    }
}

export default BababaLogo;