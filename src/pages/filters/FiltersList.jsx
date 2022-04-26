import React, {useContext, useEffect, useState} from 'react';
import {Container} from "@mui/material";
import HeaderBlock from "../../components/create/HeaderBlock";
import WorkBlock from "../../components/create/way-list/WorkBlock";
import EndBlock from "../../components/create/EndBlock";
import {useStateIfMounted} from "use-state-if-mounted";
import LoadingScreen from "../../components/LoadingScreen";
import PopupLoading from "../../components/PopupLoading";
import {PathContext} from "../../context";
import {fetchDataAccordion} from "../../util/AsyncFunctionAttributes";
import {fetchDataTable} from "../../util/AsyncFunctionStudents";
import {fetchDataFilters, fetchDataFiltersShort} from "../../util/AsyncFunctionFilters";

function FiltersList(
    {
        id,
        nameFilter,
        setNameFilter,
        selectedMailOption,
        setSelectedMailOption,
        setCurrentIdFilter,
    }
) {

    const [dataTable, setDataTable] = useStateIfMounted([])

    const [dataAccordions, setDataAccordions] = useStateIfMounted([])

    const [dataFilters, setDataFilters] = useStateIfMounted([])

    function initSelectedStudentState() {
        let memory = []
        if (id !== null) {
            for (let filter of dataFilters) {
                if (filter.id === id) memory = filter.students
            }
        }
        let ss = {}
        for (let line of dataTable) {
            ss[line.id] = memory.includes(line.id);
        }
        return ss
    }

    const [selectedStudents, setSelectedStudents] = useStateIfMounted(initSelectedStudentState())

    const {setRootPath, setCreate} = useContext(PathContext)

    useEffect(() => {
        setCreate(true)
        setRootPath("Фильтры")
        fetchDataFiltersShort(setLoadingDataFilters, setDataFilters)
        fetchDataTable(setDataTable)
        fetchDataAccordion(setDataAccordions)
        return () => {
            setRootPath("")
            setCreate(false)
            setSelectedMailOption("")
            setCurrentIdFilter(null)
            setNameFilter("")
        }
    }, [])

    useEffect(()=> {
        setSelectedStudents(initSelectedStudentState)
    }, [dataTable, dataFilters])

    function handleMailOption(event) {
        setSelectedMailOption(event.target.value)
    }

    function handleFilterName(event) {
        const name = event.target.value
        setNameFilter(name)
    }

    const [loadingDataFilters, setLoadingDataFilters] = useState(false)

    const [loading, setLoading] = useStateIfMounted(false)

    const [correctName, setCorrectName] = useStateIfMounted(true)

    const [unique, setUnique] = useStateIfMounted(true)

    const isLoading = dataTable.length === 0 || dataAccordions.length === 0 || loadingDataFilters

    return (
        isLoading ?
            <LoadingScreen/>
            :
            <Container maxWidth="lg">
                <HeaderBlock
                    name={nameFilter}
                    handle={handleFilterName}
                    isFilter={true}
                    mailOption={selectedMailOption}
                    handleMailOption={handleMailOption}
                    correctName={correctName}
                    unique={unique}
                />
                <WorkBlock
                    dataAccordions={dataAccordions}
                    dataTable={dataTable}
                    selectedStudents={selectedStudents}
                    setSelectedStudents={setSelectedStudents}
                    height={550}
                />
                <EndBlock
                    name={nameFilter}
                    selectedStudents={selectedStudents}
                    mailOption={selectedMailOption}
                    id={id}
                    setLoading={setLoading}
                    setCorrectName={setCorrectName}
                    unique={unique}
                    setUnique={setUnique}
                    data={dataFilters}
                />
                <PopupLoading active={loading}/>
            </Container>
    );
}

export default FiltersList;