import React from 'react';
import ReactDOM from 'react-dom';
import OpenController from './core/src/open-controller';
import deployment from './deployment';

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(<OpenController deployment={deployment} />, container);
