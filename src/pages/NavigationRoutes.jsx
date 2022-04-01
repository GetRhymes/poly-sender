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
import axios from "axios";
import {useStateIfMounted} from "use-state-if-mounted";

function NavigationRoutes() {

    const [currentIdAttribute, setCurrentIdAttribute] = useState(null)
    const [currentIdFilter, setCurrentIdFilter] = useState(null)

    const [dataTable, setDataTable] = useStateIfMounted([])

    const [dataAccordions, setDataAccordions] = useStateIfMounted([])

    const [dataAttributes, setDataAttributes] = useStateIfMounted([])

    async function fetchDataTable() {
        const dataTable = await axios('http://localhost:8080/students/getAll');
        setDataTable(dataTable.data);
    }
    async function fetchDataAccordion() {
        const dataAccordions = await axios('http://localhost:8080/attributes/getGroupAttributes');
        setDataAccordions(dataAccordions.data);
    }

    async function fetchDataAttributes() {
        const dataAttributes = await axios('http://localhost:8080/attributes/getAttributes');
        setDataAttributes(dataAttributes.data);
    }

    useEffect(()=> {
        fetchDataTable()
        fetchDataAccordion()
        fetchDataAttributes()
    }, [])

    return (
        <Routes>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/attributes" element={
                <ManageAttributes

                    setId={setCurrentIdAttribute}
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
                    dataTable={dataTable}
                    dataAccordions={dataAccordions}
                    dataAttributes={dataAttributes}
                />
            }/>
            <Route path="/attributes/expression" element={<AttributesExpression/>}/>
            <Route path="/filters/list" element={
                <FiltersList
                    id={currentIdFilter}
                    dataTable={dataTable}
                    dataAccordions={dataAccordions}
                />
            }/>
            <Route path="/filters/expression" element={<FiltersExpression/>}/>
        </Routes>
    );
}

export default NavigationRoutes;