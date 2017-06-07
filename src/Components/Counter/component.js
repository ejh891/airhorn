import React from 'react';
import styles from './styles.js';

const Counter = (props) => {
    return(
        <div id="count" style={styles.count}>{props.count}</div>
    )
}

export default Counter;
