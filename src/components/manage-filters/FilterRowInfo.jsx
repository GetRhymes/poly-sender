import React from 'react';

function FilterRowInfo({nameRow, valueRow}) {

    const styleContainer = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
    }

    return (
        <div style={styleContainer}>
            <div className="body__accordion__row_info body__accordion__row__left">
                <p>{nameRow}</p>
            </div>
            <div className="body__accordion__row_info body__accordion__row__right">
                <p>{valueRow}</p>
            </div>
        </div>
    );

}

export default FilterRowInfo;