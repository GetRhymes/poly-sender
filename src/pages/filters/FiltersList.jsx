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
        setCurrentIdFilter,
        nameFilter,
        setNameFilter,
        selectedMailOption,
        setSelectedMailOption,
    }
) {

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

    function initSelectedStudentState() {
        let memory = []
        if (id !== undefined) {
            for (let attribute of dataAttributes) {
                if (attribute.id === id) memory = attribute.students
            }
        }
        let ss = {}
        for (let line of dataTable) {
            ss[line.key] = memory.includes(line.key);
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

    function handleMailOption(event) {
        setSelectedMailOption(event.target.value)
    }

    function handleAttributesName(event) {
        const name = event.target.value
        setNameFilter(name)
    }

    const [loading, setLoading] = useStateIfMounted(false)

    const isLoading = dataTable.length === 0 || dataAccordions.length === 0

    return (
        isLoading ?
            <LoadingScreen/>
            :
            <Container maxWidth="lg">
                <HeaderBlock
                    name={nameFilter}
                    handle={handleAttributesName}
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