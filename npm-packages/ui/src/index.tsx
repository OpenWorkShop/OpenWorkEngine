import React from 'react';
import ReactDOM from 'react-dom';
import deployment from './deployment';
import OpenController from './open-controller';

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(<OpenController deployment={deployment} />, container);
