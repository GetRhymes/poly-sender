import React, {useEffect, useState} from "react";
import PopupCreate from "../../components/create/PopupCreate";
import '../../styles/ManageAttributes.css'
import AttributesHeaderBlock from "../../components/manage-attributes/AttributesHeaderBlock";
import AttributesBodyBlock from "../../components/manage-attributes/AttributesBodyBlock";
import {useStateIfMounted} from "use-state-if-mounted";
import PopupShare from "../../components/PopupShare";
import axios from "axios";

const ManageAttributes = ({setId}) => {

    useEffect(() => {
        fetchDataGroupNames()
    }, [])

    const [popupCreateActive, setPopupCreateActive] = useState(false)

    const [searchValue, setSearchValue] = useStateIfMounted(null)

    const [popupShareActive, setPopupShareActive] = useState(false)

    const [dataGroupNames, setDataGroupNames] = useStateIfMounted([])

    const [groupName, setGroupName] = useStateIfMounted(null)

    async function fetchDataGroupNames() {
        const dataGroupNames = await axios('http://localhost:8080/attributes/getGroupNames');
        setDataGroupNames(dataGroupNames.data);
    }

    function handleAttributesName(event) {
        const value = event.target.value
        setSearchValue(value)
    }

    return (
        dataGroupNames.length === 0 ?
            <h1>Loading...</h1>
            :
            <div className="main__container_attributes">
                <AttributesHeaderBlock
                    setPopupCreateActive={setPopupCreateActive}
                    setId={setId}
                    handleSearchValue={handleAttributesName}
                    dataGroupNames={dataGroupNames}
                    handleGroupName={setGroupName}
                />
                <AttributesBodyBlock
                    setId={setId}
                    searchValue={searchValue}
                    setPopupShareActive={setPopupShareActive}
                    groupName={groupName}
                />
                <PopupCreate active={popupCreateActive} setActive={setPopupCreateActive} endPoint="attributes"/>
                <PopupShare active={popupShareActive} setActive={setPopupShareActive}/>
            </div>
    );
};

export default ManageAttributes;