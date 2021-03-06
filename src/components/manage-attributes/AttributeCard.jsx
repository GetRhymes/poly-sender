import React from 'react';
import ButtonActionGroup from "../ButtonActionGroup";
import AttributeRowInfo from "./AttributeRowInfo";
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';

function AttributeCard({attribute, setId, setPopupShareActive, setNameAttribute, setSelectedGroupName, setLoading}) {

    const id = localStorage.getItem('idStaff')

    return (
        <div className="attribute__card">
            <div
                className={attribute.link || attribute.owner !== id ? "attribute__card__header disabled__header" : "attribute__card__header"}>
                <p className="attribute__card__header__text">{attribute.attributeName}</p>
                {
                    attribute.status === "warning" ?
                        <WarningIcon sx={{marginRight: "10px", color: "#f6d65e"}}/>
                        :
                        attribute.status === "error" ?
                            <ReportIcon sx={{marginRight: "10px", color: "#ff5f5f"}}/>
                            :
                            <div style={{height: "24px", width: "24px", marginRight: "10px"}}/>

                }


            </div>
            <div
                className={attribute.link || attribute.owner !== id ? "attribute__card__body disabled__body" : "attribute__card__body"}>
                <div className="attribute__card__body__info">
                    <AttributeRowInfo nameRow="Раздел:" valueRow={attribute.groupName} link={attribute.link}/>
                    <AttributeRowInfo nameRow="Студенты:" valueRow={attribute.students.length} link={attribute.link}/>
                    <AttributeRowInfo nameRow="Создан:" valueRow={getType(attribute.type)} link={attribute.link}/>
                    <AttributeRowInfo nameRow="Дата создания:" valueRow={attribute.created} link={attribute.link}/>
                </div>
                <div className="attribute__card__body__buttons">
                    <ButtonActionGroup
                        orientation="vertical"
                        endPoint="attributes"
                        type={attribute.type}
                        id={attribute.id}
                        setId={setId}
                        setPopupShareActive={setPopupShareActive}
                        name={attribute.attributeName}
                        setName={setNameAttribute}
                        selectedOption={attribute.groupName}
                        setSelectedOption={setSelectedGroupName}
                        setLoading={setLoading}
                        link={attribute.link}
                        basic={attribute.owner !== id}
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