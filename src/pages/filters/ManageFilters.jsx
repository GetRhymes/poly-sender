import React, {useContext, useEffect, useState} from 'react';
import '../../styles/ManageFilters.css'
import FilterHeaderBlock from "../../components/manage-filters/FilterHeaderBlock";
import FilterBodyBlock from "../../components/manage-filters/FilterBodyBlock";
import PopupCreate from "../../components/create/PopupCreate";
import {useStateIfMounted} from "use-state-if-mounted";
import PopupShare from "../../components/PopupShare";
import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen";
import CleanBlock from "../../components/CleanBlock";
import {PathContext} from "../../context";

const ManageFilters = ({idFilter, setId, setNameFilter, setSelectedMailOption}) => {

    const [dataFilters, setDataFilters] = useStateIfMounted([])

    async function fetchDataFilters() {
        setLoadingDataFilters(true)
        const dataFilters = await axios('http://localhost:8080/filters/getFilters');
        setDataFilters(dataFilters.data)
        setLoadingDataFilters(false)
    }

    const [loadingDataFilters, setLoadingDataFilters] = useState(false)

    const [loadingDeleteFilter, setLoadingDeleteFilter] = useState(false)

    const [popupCreateActive, setPopupCreateActive] = useState(false)

    const [searchValue, setSearchValue] = useStateIfMounted(null)

    const [popupShareActive, setPopupShareActive] = useState(false)

    const {setRootPath} = useContext(PathContext)

    useEffect(() => {
        setRootPath("Фильтры")
        fetchDataFilters()
        return (() => {
            setRootPath("")
        })
    }, [loadingDeleteFilter])

    function handleFiltersName(event) {
        const value = event.target.value
        setSearchValue(value)
    }

    const isLoading = loadingDataFilters || loadingDeleteFilter

    return (
        isLoading ?
            <LoadingScreen/>
            :
            <div className="background main__container__filters">
                <FilterHeaderBlock
                    setPopupCreateActive={setPopupCreateActive}
                    handleSearchValue={handleFiltersName}
                    setId={setId}
                />
                {
                    dataFilters.length === 0 ?
                        <CleanBlock/>
                        :
                        <FilterBodyBlock
                            setId={setId}
                            searchValue={searchValue}
                            setPopupShareActive={setPopupShareActive}
                            dataFilters={dataFilters}
                            setLoading={setLoadingDeleteFilter}
                            setNameFilter={setNameFilter}
                            setSelectedMailOption={setSelectedMailOption}
                        />
                }
                <PopupCreate active={popupCreateActive} setActive={setPopupCreateActive} endPoint="filters"/>
                <PopupShare active={popupShareActive} setActive={setPopupShareActive} id={idFilter} setId={setId} endPoint="filters"/>
            </div>
    );
};

export default ManageFilters;
