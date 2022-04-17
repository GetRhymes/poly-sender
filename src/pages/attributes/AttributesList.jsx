import React, {useEffect} from 'react';
import '../../styles/CreationPages.css'
import {Container} from "@mui/material";
import HeaderBlock from "../../components/create/HeaderBlock";
import WorkBlock from "../../components/create/way-list/WorkBlock";
import EndBlock from "../../components/create/EndBlock";
import {useStateIfMounted} from "use-state-if-mounted";
import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen";
import PopupLoading from "../../components/PopupLoading";

function AttributesList(
    {
        id,
        nameAttribute,
        setNameAttribute,
        selectedGroupName,
        setSelectedGroupName,
        setCurrentIdAttribute
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
        if (id !== null) {
            for (let attribute of dataAttributes) {
                if (attribute.id === id) memory = attribute.students
            }
        }
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
            setSelectedGroupName("")
            setCurrentIdAttribute(null)
            setNameAttribute("")
        }
    }, [])

    useEffect(()=> {
        setSelectedStudents(initSelectedStudentState)
    }, [dataTable, dataAttributes])

    function handleSelectedGroupName(event) {
        const groupName = event.target.value
        setSelectedGroupName(groupName)
    }

    function handleAttributesName(event) {
        const name = event.target.value
        setNameAttribute(name)
    }

    const [loading, setLoading] = useStateIfMounted(false)

    const [correctName, setCorrectName] = useStateIfMounted(true)

    const [unique, setUnique] = useStateIfMounted(true)

    const isLoading = dataTable.length === 0 || dataAccordions.length === 0 || dataAttributes.length === 0

    return (
        isLoading ?
            <LoadingScreen/>
            :
            <Container maxWidth="lg">
                <HeaderBlock
                    name={nameAttribute}
                    handle={handleAttributesName}
                    isFilter={false}
                    selectedGroupName={selectedGroupName}
                    handleSelector={handleSelectedGroupName}
                    correctName={correctName}
                    unique={unique}
                />
                <WorkBlock
                    dataAccordions={dataAccordions}
                    dataTable={dataTable}
                    selectedStudents={selectedStudents}
                    setSelectedStudents={setSelectedStudents}
                    height={590}
                />
                <EndBlock
                    name={nameAttribute}
                    selectedStudents={selectedStudents}
                    selectedGroupName={selectedGroupName}
                    id={id}
                    setLoading={setLoading}
                    setCorrectName={setCorrectName}
                    unique={unique}
                    setUnique={setUnique}
                    data={dataAttributes}
                />
                <PopupLoading active={loading}/>
            </Container>
    );
}

export default AttributesList;
