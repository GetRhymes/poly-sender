import React, {useState} from 'react';
import '../../styles/ManageFilters.css'
import FilterHeaderBlock from "../../components/manage-filters/FilterHeaderBlock";
import FilterBodyBlock from "../../components/manage-filters/FilterBodyBlock";
import PopupCreate from "../../components/create/PopupCreate";
import {useStateIfMounted} from "use-state-if-mounted";
import PopupShare from "../../components/PopupShare";

const ManageFilters = ({setId}) => {

    const [popupCreateActive, setPopupCreateActive] = useState(false)

    const [searchValue, setSearchValue] = useStateIfMounted(null)

    const [popupShareActive, setPopupShareActive] = useState(false)

    function handleFiltersName(event) {
        const value = event.target.value
        setSearchValue(value)
    }

    return (
        <div className="background main__container__filters">
            <FilterHeaderBlock
                popupCreateActive={popupCreateActive}
                setPopupCreateActive={setPopupCreateActive}
                handleSearchValue={handleFiltersName}
            />
            <FilterBodyBlock
                setId={setId}
                searchValue={searchValue}
                setPopupShareActive={setPopupShareActive}
            />
            <PopupCreate active={popupCreateActive} setActive={setPopupCreateActive} endPoint="filters"/>
            <PopupShare active={popupShareActive} setActive={setPopupShareActive}/>
        </div>
    );
};

export default ManageFilters;
