import React, {useState} from 'react';
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

function NavigationRoutes({setRootPath, setCreate}) {

    const [currentIdAttribute, setCurrentIdAttribute] = useState(null)

    const [currentIdFilter, setCurrentIdFilter] = useState(null)

    const [nameAttribute, setNameAttribute] = useStateIfMounted("")

    const [selectedGroupName, setSelectedGroupName] = useState("")

    const [nameFilter, setNameFilter] = useStateIfMounted("")

    const [selectedMailOption, setSelectedMailOption] = useState("")

    const [expression, setExpression] = useStateIfMounted("")

    return (
        <Routes>
            <Route path="/profile" element={<Profile setRootPath={setRootPath}/>}/>
            <Route path="/attributes" element={
                <ManageAttributes
                    idAttribute={currentIdAttribute}
                    setId={setCurrentIdAttribute}
                    setNameAttribute={setNameAttribute}
                    setSelectedGroupName={setSelectedGroupName}
                    setRootPath={setRootPath}
                />
            }/>
            <Route path="/filters" element={
                <ManageFilters
                    idFilter={currentIdFilter}
                    setId={setCurrentIdFilter}
                    setNameFilter={setNameFilter}
                    setSelectedMailOption={setSelectedMailOption}
                    setRootPath={setRootPath}
                />
            }/>
            <Route path="/lists" element={<ExcelLists setRootPath={setRootPath}/>}/>
            <Route path="/attributes/list" element={
                <AttributesList
                    id={currentIdAttribute}
                    nameAttribute={nameAttribute}
                    setNameAttribute={setNameAttribute}
                    selectedGroupName={selectedGroupName}
                    setSelectedGroupName={setSelectedGroupName}
                    setCurrentIdAttribute={setCurrentIdAttribute}
                    setCreate={setCreate}
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
                    setCreate={setCreate}
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
                    setCreate={setCreate}
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
                    setCreate={setCreate}
                />
            }/>
        </Routes>
    );
}

export default NavigationRoutes;