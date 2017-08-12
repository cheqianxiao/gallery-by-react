import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Stage from './components/Stage';

import './css/index.css'  
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Stage />, document.getElementById('root'));
registerServiceWorker();
