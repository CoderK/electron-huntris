import React from 'react';
import ReactDOM from 'react-dom';
import Huntris from './huntris/index.jsx';

ReactDOM.render(
    <Huntris
        width='280'
        height='500'
        unitSize='20'
        style={{
            transform: 'translateY(-50%)',
            width: '50%',
            margin: '50% auto auto auto'
        }}
    />,
    document.getElementById('container')
);
