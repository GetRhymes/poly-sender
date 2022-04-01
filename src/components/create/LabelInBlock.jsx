import React from 'react';

function LabelInBlock({label}) {
    return (
        <div className="header__label">
            <p>{label}</p>
        </div>
    );
}

export default LabelInBlock;