import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Profile from "./Profile";
import ManageAttributes from "./attributes/ManageAttributes";
import ManageFilters from "./filters/ManageFilters";
import ExcelLists from "./ExcelLists";
import AttributesList from "./attributes/AttributesList";
import AttributesExpression from "./attributes/AttributesExpression";
import FiltersList from "./filters/FiltersList";
import FiltersExpression from "./filters/FiltersExpression";
import {useStateIfMounted} from "use-state-if-mounted";

function NavigationRoutes() {

    const [currentIdAttribute, setCurrentIdAttribute] = useState(null)

    const [currentIdFilter, setCurrentIdFilter] = useState(null)

    const [nameAttribute, setNameAttribute] = useStateIfMounted("")

    const [selectedGroupName, setSelectedGroupName] = useState("")

    return (
        <Routes>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/attributes" element={
                <ManageAttributes
                    setId={setCurrentIdAttribute}
                    setNameAttribute={setNameAttribute}
                    setSelectedGroupName={setSelectedGroupName}
                />
            }/>
            <Route path="/filters" element={
                <ManageFilters
                    setId={setCurrentIdFilter}
                />
            }/>
            <Route path="/lists" element={<ExcelLists/>}/>
            <Route path="/attributes/list" element={
                <AttributesList
                    id={currentIdAttribute}
                    nameAttribute={nameAttribute}
                    setNameAttribute={setNameAttribute}
                    selectedGroupName={selectedGroupName}
                    setSelectedGroupName={setSelectedGroupName}
                    setCurrentIdAttribute={setCurrentIdAttribute}
                />
            }/>
            <Route path="/attributes/expression" element={<AttributesExpression/>}/>
            <Route path="/filters/list" element={
                <FiltersList
                    id={currentIdFilter}
                    // dataTable={dataTable}
                    // dataAccordions={dataAccordions}
                />
            }/>
            <Route path="/filters/expression" element={<FiltersExpression/>}/>
        </Routes>
    );
}

export default NavigationRoutes;