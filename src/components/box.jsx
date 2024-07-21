import React from 'react';
import './box.css';

function Box({ value, onClick }) {
    return (
        <div className={`Box ${value === 'X' ? 'clicked' : ''} ${value === 'O' ? 'Mclicked' : '' }`} onClick={onClick} >
            {value}
        </div>
    );

}

export default Box;
