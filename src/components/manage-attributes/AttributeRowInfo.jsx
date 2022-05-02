import React from 'react';

function AttributeRowInfo({nameRow, valueRow, link}) {

    return (
        <div className={!link ? "attribute__row__info" : "attribute__row__info row_disabled"}>
            <p className="attribute__row__text attribute__row__info__left">{nameRow}</p>
            <p className="attribute__row__text attribute__row__info__right">{valueRow}</p>
        </div>
    );
}

export default AttributeRowInfo;