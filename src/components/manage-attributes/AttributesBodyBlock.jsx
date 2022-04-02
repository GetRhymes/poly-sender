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
        dataAttributes
    }
) {

    const checkOnlyGroupName = (attributes) => attributes.groupName.includes(groupName)
    const checkOnlyAttributeName = (attributes) => attributes.attributeName.includes(searchValue)

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
                        />
                    );
                }
            })}
        </div>
    );
}

export default AttributesBodyBlock;