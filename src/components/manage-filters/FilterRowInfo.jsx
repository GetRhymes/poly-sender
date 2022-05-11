import React from 'react';

function FilterRowInfo({nameRow, valueRow, link}) {

    const styleContainer = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        color: !link ? "#366ac3" : "#858b93"
    }


    return (
        <div style={styleContainer}>
            <p className="body__accordion__row_info body__accordion__row__left">{nameRow}</p>
            <p

                onClick={() => {
                    if (nameRow === 'Почтовый адрес:') {
                        window.open('mailto:' + valueRow)
                    }
                }}
                className="body__accordion__row_info body__accordion__row__right">{valueRow}</p>
        </div>
    );

}

export default FilterRowInfo;