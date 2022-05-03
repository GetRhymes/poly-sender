import React, {useContext, useEffect, useState} from 'react';
import '../../styles/ManageFilters.css'
import FilterHeaderBlock from "../../components/manage-filters/FilterHeaderBlock";
import FilterBodyBlock from "../../components/manage-filters/FilterBodyBlock";
import PopupCreate from "../../components/create/PopupCreate";
import {useStateIfMounted} from "use-state-if-mounted";
import PopupShare from "../../components/PopupShare";
import LoadingScreen from "../../components/LoadingScreen";
import CleanBlock from "../../components/CleanBlock";
import {PathContext} from "../../context";
import {fetchDataFilters} from "../../util/AsyncFunctionFilters";

const ManageFilters = ({idFilter, setId, setNameFilter, setSelectedMailOption}) => {

    const [dataFilters, setDataFilters] = useStateIfMounted([])

    const [loadingDataFilters, setLoadingDataFilters] = useState(false)

    const [loadingDeleteFilter, setLoadingDeleteFilter] = useState(false)

    const [popupCreateActive, setPopupCreateActive] = useState(false)

    const [searchValue, setSearchValue] = useStateIfMounted(null)

    const [popupShareActive, setPopupShareActive] = useState(false)

    const {setRootPath, loadFilterAfterNot} = useContext(PathContext)

    useEffect(() => {
        setRootPath("Фильтры")
        fetchDataFilters(setLoadingDataFilters, setDataFilters)
        return (() => {
            setRootPath("")
        })
    }, [loadingDeleteFilter, loadFilterAfterNot])

    function handleFiltersName(event) {
        const value = event.target.value
        setSearchValue(value)
    }

    const isLoading = loadingDataFilters || loadingDeleteFilter || loadFilterAfterNot

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
