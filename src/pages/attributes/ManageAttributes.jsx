import React, {useContext, useEffect, useState} from "react";
import PopupCreate from "../../components/create/PopupCreate";
import '../../styles/ManageAttributes.css'
import AttributesHeaderBlock from "../../components/manage-attributes/AttributesHeaderBlock";
import AttributesBodyBlock from "../../components/manage-attributes/AttributesBodyBlock";
import {useStateIfMounted} from "use-state-if-mounted";
import PopupShare from "../../components/PopupShare";
import LoadingScreen from "../../components/LoadingScreen";
import CleanBlock from "../../components/CleanBlock";
import {PathContext} from "../../context";
import {fetchDataAttributesCurrentStaff, fetchDataGroupNames} from "../../util/AsyncFunctionAttributes";

const ManageAttributes = ({idAttribute, setId, setNameAttribute, setSelectedGroupName}) => {

    const [dataAttributes, setDataAttributes] = useStateIfMounted([])

    const [dataGroupNames, setDataGroupNames] = useStateIfMounted([])

    const [loadingAttributes, setLoadingAttributes] = useState(false)

    const [loadingGroupNames, setLoadingGroupNames] = useState(false)

    const [loadingCreateGroupName, setLoadingCreateGroupName] = useState(false)

    const [loadingDeleteAttribute, setLoadingDeleteAttribute] = useState(false)

    const [loadingDeleteGroupAttribute, setLoadingDeleteGroupAttribute] = useState(false)

    const [popupCreateActive, setPopupCreateActive] = useState(false)

    const [searchValue, setSearchValue] = useStateIfMounted(null)

    const [popupShareActive, setPopupShareActive] = useState(false)

    const [groupName, setGroupName] = useStateIfMounted(null)

    const {setRootPath, loadAttrAfterNot} = useContext(PathContext)

    useEffect(() => {
        fetchDataGroupNames(setLoadingGroupNames, setDataGroupNames)
        fetchDataAttributesCurrentStaff(setLoadingAttributes, setDataAttributes)
        setRootPath("Атрибуты")
        return (() => {
            setRootPath("")
        })
    }, [loadingDeleteAttribute, loadingCreateGroupName, loadingDeleteGroupAttribute, loadAttrAfterNot])

    function handleAttributesName(event) {
        const value = event.target.value
        setSearchValue(value)
    }

    const isLoading =
        loadingAttributes ||
        loadingGroupNames ||
        loadingCreateGroupName ||
        loadingDeleteAttribute ||
        loadingDeleteGroupAttribute ||
        loadAttrAfterNot

    return (
        isLoading ?
            <LoadingScreen/>
            :
            <div className="main__container__attributes">
                <AttributesHeaderBlock
                    setPopupCreateActive={setPopupCreateActive}
                    setId={setId}
                    handleSearchValue={handleAttributesName}
                    dataGroupNames={dataGroupNames}
                    handleGroupName={setGroupName}
                    setLoading={setLoadingDeleteGroupAttribute}
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
                            setLoading={setLoadingDeleteAttribute}
                        />
                }
                <PopupShare
                    active={popupShareActive}
                    setActive={setPopupShareActive}
                    id={idAttribute}
                    setId={setId}
                    endPoint="attributes"
                />
                <PopupCreate
                    active={popupCreateActive}
                    setActive={setPopupCreateActive}
                    endPoint="attributes"
                    setLoading={setLoadingCreateGroupName}
                    dataGroupNames={dataGroupNames}
                />
            </div>
    );
};

export default ManageAttributes;