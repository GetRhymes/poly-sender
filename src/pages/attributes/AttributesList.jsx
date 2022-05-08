import React, {useContext, useEffect} from 'react';
import '../../styles/CreationPages.css'
import {Container} from "@mui/material";
import HeaderBlock from "../../components/create/HeaderBlock";
import WorkBlock from "../../components/create/way-list/WorkBlock";
import EndBlock from "../../components/create/EndBlock";
import {useStateIfMounted} from "use-state-if-mounted";
import LoadingScreen from "../../components/LoadingScreen";
import PopupLoading from "../../components/PopupLoading";
import {PathContext} from "../../context";
import {fetchDataTable} from "../../util/AsyncFunctionStudents";
import {fetchDataAccordion, fetchDataAttributes} from "../../util/AsyncFunctionAttributes";

function AttributesList(
    {
        id,
        nameAttribute,
        setNameAttribute,
        selectedGroupName,
        setSelectedGroupName,
        setCurrentIdAttribute,
    }
) {

    const [dataTable, setDataTable] = useStateIfMounted([])

    const [dataAccordions, setDataAccordions] = useStateIfMounted([])

    const [dataAttributes, setDataAttributes] = useStateIfMounted([])

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

    const {setRootPath, setCreate, handleAccess} = useContext(PathContext)

    useEffect(() => {
        fetchDataTable(setDataTable, handleAccess)
        fetchDataAttributes(setDataAttributes, handleAccess)
        fetchDataAccordion(setDataAccordions, handleAccess)

        setCreate(true)
        setRootPath("Атрибуты")

        return () => {
            setSelectedGroupName("")
            setCurrentIdAttribute(null)
            setNameAttribute("")
            setCreate(false)
            setRootPath("")
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
