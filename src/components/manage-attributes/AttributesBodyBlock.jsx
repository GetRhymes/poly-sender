import React from 'react';
import AttributeCard from "./AttributeCard";


function AttributesBodyBlock(
    {
        setId,
        searchValue,
        setPopupShareActive,
        groupName,
        setNameAttribute,
        setSelectedGroupName,
        dataAttributes,
        setLoading
    }
) {

    const checkOnlyGroupName = (attributes) => attributes.groupName.includes(groupName.groupName)
    const checkOnlyAttributeName = (attributes) => searchValue !== null && attributes.attributeName.toLowerCase().includes(searchValue.toLowerCase())

    return (
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
                                setNameAttribute={setNameAttribute}
                                setSelectedGroupName={setSelectedGroupName}
                                setLoading={setLoading}
                            />
                        );
                    } else if (searchValue === null && checkOnlyGroupName(attributes)) {
                        return (
                            <AttributeCard
                                key={attributes.id}
                                attribute={attributes}
                                setId={setId}
                                setPopupShareActive={setPopupShareActive}
                                setNameAttribute={setNameAttribute}
                                setSelectedGroupName={setSelectedGroupName}
                                setLoading={setLoading}
                            />
                        );
                    } else if (checkOnlyAttributeName(attributes) && checkOnlyGroupName(attributes)) {
                        return (
                            <AttributeCard
                                key={attributes.id}
                                attribute={attributes}
                                setId={setId}
                                setPopupShareActive={setPopupShareActive}
                                setNameAttribute={setNameAttribute}
                                setSelectedGroupName={setSelectedGroupName}
                                setLoading={setLoading}
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
                            setNameAttribute={setNameAttribute}
                            setSelectedGroupName={setSelectedGroupName}
                            setLoading={setLoading}
                        />
                    );
                }
            })}
        </div>
    );
}

export default AttributesBodyBlock;