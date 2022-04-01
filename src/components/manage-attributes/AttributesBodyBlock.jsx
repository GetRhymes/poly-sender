import React, {useEffect} from 'react';
import AttributeCard from "./AttributeCard";
import {useStateIfMounted} from "use-state-if-mounted";
import axios from "axios";


function AttributesBodyBlock({setId, searchValue, setPopupShareActive, groupName}) {

    useEffect(() => {
        fetchDataAttributes()
    }, [])

    const [dataAttributes, setDataAttributes] = useStateIfMounted([])

    async function fetchDataAttributes() {
        const dataAttributes = await axios('http://localhost:8080/attributes/getAttributes');
        setDataAttributes(dataAttributes.data);
    }

    const checkOnlyGroupName = (attributes) => attributes.groupName.includes(groupName)
    const checkOnlyAttributeName = (attributes) => attributes.attributeName.includes(searchValue)

    return (
        dataAttributes.length === 0 ?
            <h1>Loading...</h1>
            :
            <div className="attributes__body__block">
                {dataAttributes.map((attributes) => {
                    if (searchValue !== null || groupName !== null) {
                        if (groupName === null && checkOnlyAttributeName(attributes)) {
                            return (
                                <AttributeCard
                                    key={attributes.id}
                                    attribute={attributes}
                                    setId={setId}
                                    setPopupShareActive={setPopupShareActive}
                                />
                            );
                        } else if (searchValue === null && checkOnlyGroupName(attributes)) {
                            return (
                                <AttributeCard
                                    key={attributes.id}
                                    attribute={attributes}
                                    setId={setId}
                                    setPopupShareActive={setPopupShareActive}
                                />
                            );
                        } else if (checkOnlyAttributeName(attributes) && checkOnlyGroupName(attributes)) {
                            return (
                                <AttributeCard
                                    key={attributes.id}
                                    attribute={attributes}
                                    setId={setId}
                                    setPopupShareActive={setPopupShareActive}
                                />
                            );
                        }
                    } else {
                        return (
                            <AttributeCard
                                key={attributes.id}
                                attribute={attributes}
                                setId={setId}
                                setPopupShareActive={setPopupShareActive}
                            />
                        );
                    }
                })}
            </div>
    );
}

export default AttributesBodyBlock;