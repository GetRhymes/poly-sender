import React, {useEffect} from 'react';
import {Container} from "@mui/material";
import HeaderBlock from "../../components/create/HeaderBlock";
import WorkBlock from "../../components/create/way-list/WorkBlock";
import EndBlock from "../../components/create/EndBlock";
import {useStateIfMounted} from "use-state-if-mounted";
import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen";
import PopupLoading from "../../components/PopupLoading";

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

    async function fetchDataTable() {
        const dataTable = await axios('http://localhost:8080/students/getAll');
        setDataTable(dataTable.data);
    }

    async function fetchDataAccordion() {
        const dataAccordions = await axios('http://localhost:8080/attributes/getGroupAttributes');
        setDataAccordions(dataAccordions.data);
    }

    async function fetchDataAttributes() {
        const dataFilters = await axios('http://localhost:8080/filters/getFiltersShort');
        setDataFilters(dataFilters.data);
    }

    function initSelectedStudentState() {
        let memory = []
        if (id !== null) {
            for (let filter of dataFilters) {
                if (filter.id === id) memory = filter.students
            }
        }
        console.log(id)
        console.log(memory)
        let ss = {}
        for (let line of dataTable) {
            ss[line.id] = memory.includes(line.id);
        }
        return ss
    }

    const [selectedStudents, setSelectedStudents] = useStateIfMounted(initSelectedStudentState())

    useEffect(() => {
        fetchDataAttributes()
        fetchDataTable()
        fetchDataAccordion()

        return () => {
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

    const [loading, setLoading] = useStateIfMounted(false)

    const isLoading = dataTable.length === 0 || dataAccordions.length === 0 || dataFilters.length === 0

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
                />
                <PopupLoading active={loading}/>
            </Container>
    );
}

export default FiltersList;