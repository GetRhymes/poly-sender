import React, {useState} from 'react';
import {Navigate, Route, Routes,} from "react-router-dom";
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

    const [nameFilter, setNameFilter] = useStateIfMounted("")

    const [selectedMailOption, setSelectedMailOption] = useState("")

    const [expression, setExpression] = useStateIfMounted("")

    return (
        <Routes>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/attributes" element={
                <ManageAttributes
                    idAttribute={currentIdAttribute}
                    setId={setCurrentIdAttribute}
                    setNameAttribute={setNameAttribute}
                    setSelectedGroupName={setSelectedGroupName}
                />
            }/>
            <Route path="/filters" element={
                <ManageFilters
                    idFilter={currentIdFilter}
                    setId={setCurrentIdFilter}
                    setNameFilter={setNameFilter}
                    setSelectedMailOption={setSelectedMailOption}
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
            <Route path="/attributes/expression" element={
                <AttributesExpression
                    id={currentIdAttribute}
                    nameAttribute={nameAttribute}
                    setNameAttribute={setNameAttribute}
                    selectedGroupName={selectedGroupName}
                    setSelectedGroupName={setSelectedGroupName}
                    setCurrentIdAttribute={setCurrentIdAttribute}
                    expression={expression}
                    setExpression={setExpression}
                />
            }/>
            <Route path="/filters/list" element={
                <FiltersList
                    id={currentIdFilter}
                    nameFilter={nameFilter}
                    setNameFilter={setNameFilter}
                    selectedMailOption={selectedMailOption}
                    setSelectedMailOption={setSelectedMailOption}
                    setCurrentIdFilter={setCurrentIdFilter}
                />
            }/>
            <Route path="/filters/expression" element={
                <FiltersExpression
                    id={currentIdFilter}
                    setId={setCurrentIdFilter}
                    nameFilter={nameFilter}
                    setNameFilter={setNameFilter}
                    expression={expression}
                    setExpression={setExpression}
                    selectedMailOption={selectedMailOption}
                    setSelectedMailOption={setSelectedMailOption}
                />
            }/>
            <Route path="*" element={<Navigate to="/attributes"/>}/>
        </Routes>
    );
}

export default NavigationRoutes;