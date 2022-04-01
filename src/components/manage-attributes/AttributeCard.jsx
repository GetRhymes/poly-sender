import React from 'react';
import ButtonActionGroup from "../ButtonActionGroup";
import AttributeRowInfo from "./AttributeRowInfo";

function AttributeCard({attribute, setId, setPopupShareActive}) {
    return (
        <div className="attribute__card">
            <div className="attribute__card__header">
                <p className="attribute__card__header__text">{attribute.attributeName}</p>
            </div>
            <div className="attribute__card__body">
                <div className="attribute__card__body__info">
                    <AttributeRowInfo nameRow="Раздел:" valueRow={attribute.groupName}/>
                    <AttributeRowInfo nameRow="Студенты:" valueRow={attribute.students.length}/>
                    <AttributeRowInfo nameRow="Создан:" valueRow={getType(attribute.type)}/>
                    <AttributeRowInfo nameRow="Дата создания:" valueRow={attribute.created}/>
                </div>
                <div className="attribute__card__body__buttons">
                    <ButtonActionGroup
                        orientation="vertical"
                        endPoint="attributes"
                        type={attribute.type}
                        id={attribute.id}
                        setId={setId}
                        setPopupShareActive={setPopupShareActive}
                    />
                </div>
            </div>
        </div>
    );
}

function getType(type) {
    if (type === "list") return "из списка"
    else if (type === "expression") return "выражение"
    else return ""
}

export default AttributeCard;