import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './Components/AppContainer/component';
import registerServiceWorker from './registerServiceWorker';
import './css/index.css';
import './css/bootstrap-switch-15.0.3.min.css';
import './css/bootstrap-3.3.7.min.css';

ReactDOM.render(<AppContainer apiServerRoot={"http://localhost:" + (process.env.PORT || 3001)}/>, document.getElementById('root'));
registerServiceWorker();
