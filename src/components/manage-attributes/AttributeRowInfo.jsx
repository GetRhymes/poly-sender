import React from 'react';

function AttributeRowInfo({nameRow, valueRow}) {

    return (
        <div className="attribute__row__info">
            <div className="attribute__row__text attribute__row__info__left">
                <p>{nameRow}</p>
            </div>
            <div className="attribute__row__text attribute__row__info__right">
                <p>{valueRow}</p>
            </div>
        </div>
    );
}

export default AttributeRowInfo;