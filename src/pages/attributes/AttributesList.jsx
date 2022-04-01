import React, {useEffect} from 'react';
import '../../styles/CreationPages.css'
import {Container} from "@mui/material";
import HeaderBlock from "../../components/create/HeaderBlock";
import WorkBlock from "../../components/create/way-list/WorkBlock";
import EndBlock from "../../components/create/EndBlock";
import {useStateIfMounted} from "use-state-if-mounted";


function AttributesList({id, dataTable, dataAccordions, dataAttributes}) {

    const [selectedStudents, setSelectedStudents] = useStateIfMounted(initSelectedStudentState())

    const [selectedGroupName, setSelectedGroupName] = useStateIfMounted("")

    function handleSelectedGroupName(event) {
        const groupName = event.target.value
        setSelectedGroupName(groupName)
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
            ss[line.id] = memory.includes(line.id);
        }
        return ss
    }


    const [nameAttribute, setNameAttribute] = useStateIfMounted("")

    function handleAttributesName(event) {
        const name = event.target.value
        setNameAttribute(name)
    }

    const isLoading = dataTable.length === 0 || dataAccordions.length === 0 || dataAttributes.length === 0

    return (
        isLoading ?
            <h1>Loading...</h1>
            :
            <Container maxWidth="lg">
                <HeaderBlock
                    name={nameAttribute}
                    handle={handleAttributesName}
                    isFilter={false}
                    selectedName={selectedGroupName}
                    handleSelector={handleSelectedGroupName}
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
                />
            </Container>
    );
}

export default AttributesList;
