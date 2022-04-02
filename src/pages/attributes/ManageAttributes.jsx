import React, {useEffect, useState} from "react";
import PopupCreate from "../../components/create/PopupCreate";
import '../../styles/ManageAttributes.css'
import AttributesHeaderBlock from "../../components/manage-attributes/AttributesHeaderBlock";
import AttributesBodyBlock from "../../components/manage-attributes/AttributesBodyBlock";
import {useStateIfMounted} from "use-state-if-mounted";
import PopupShare from "../../components/PopupShare";
import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen";
import CleanBlock from "../../components/CleanBlock";

const ManageAttributes = ({setId, setNameAttribute, setSelectedGroupName}) => {

    useEffect(() => {
        fetchDataGroupNamesCurrentStaff()
        fetchDataAttributesCurrentStaff()
    }, [])

    const [dataAttributes, setDataAttributes] = useStateIfMounted([])

    const [dataGroupNames, setDataGroupNames] = useStateIfMounted([])

    async function fetchDataAttributesCurrentStaff() {
        setLoadingAttributes(true)
        const dataAttributes = await axios('http://localhost:8080/attributes/getAttributesCurrentStaff');
        setDataAttributes(dataAttributes.data);
        setLoadingAttributes(false)
    }

    async function fetchDataGroupNamesCurrentStaff() {
        setLoadingGroupNames(true)
        const dataGroupNames = await axios('http://localhost:8080/attributes/getGroupNamesCurrentStaff');
        setDataGroupNames(dataGroupNames.data);
        setLoadingGroupNames(false)
    }

    let [loadingAttributes, setLoadingAttributes] = useState(false)

    let [loadingGroupNames, setLoadingGroupNames] = useState(false)

    let [loadingCreateGroupName, setLoadingCreateGroupName] = useState(false)

    const [popupCreateActive, setPopupCreateActive] = useState(false)

    const [searchValue, setSearchValue] = useStateIfMounted(null)

    const [popupShareActive, setPopupShareActive] = useState(false)

    const [groupName, setGroupName] = useStateIfMounted(null)


    function handleAttributesName(event) {
        const value = event.target.value
        setSearchValue(value)
    }

    const isLoading = loadingAttributes || loadingGroupNames || loadingCreateGroupName

    return (
        isLoading ?
            <LoadingScreen/>
            :
            <div className="main__container_attributes">
                <AttributesHeaderBlock
                    setPopupCreateActive={setPopupCreateActive}
                    setId={setId}
                    handleSearchValue={handleAttributesName}
                    dataGroupNames={dataGroupNames}
                    handleGroupName={setGroupName}
                />
                {
                    dataAttributes.length === 0 ?
                        <CleanBlock/>
                        :
                        <AttributesBodyBlock
                            setId={setId}
                            searchValue={searchValue}
                            setPopupShareActive={setPopupShareActive}
                            groupName={groupName}
                            setNameAttribute={setNameAttribute}
                            setSelectedGroupName={setSelectedGroupName}
                            dataAttributes={dataAttributes}
                        />
                }
                <PopupShare active={popupShareActive} setActive={setPopupShareActive}/>
                <PopupCreate
                    active={popupCreateActive}
                    setActive={setPopupCreateActive}
                    endPoint="attributes"
                    setLoading={setLoadingCreateGroupName}
                />
            </div>
    );
};

export default ManageAttributes;