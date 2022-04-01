import React from 'react'; //todo refactor
import {Container} from "@mui/material";
import HeaderBlock from "../../components/create/HeaderBlock";
import WorkBlock from "../../components/create/way-list/WorkBlock";
import EndBlock from "../../components/create/EndBlock";
import {dataAccordions, dataAttributes} from "../../components/data/data";
import {useStateIfMounted} from "use-state-if-mounted";

function FiltersList({id, dataTable, dataAccordions}) {

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

    const [nameFilter, setNameFilter] = useStateIfMounted("")

    function handleAttributesName(event) {
        const name = event.target.value
        setNameFilter(name)
    }

    const [mailOption, setMailOption] = useStateIfMounted("auto")

    function handleMailOption(event) {
        setMailOption(event.target.value)
    }

    const isLoading = dataTable.length === 0 || dataAccordions.length === 0

    return (
        isLoading ?
            <h1>Loading...</h1>
            :
            <Container maxWidth="lg">
                <HeaderBlock name={nameFilter} handle={handleAttributesName} isFilter={true} mailOption={mailOption}
                             handleMailOption={handleMailOption}/>
                <WorkBlock
                    dataAccordions={dataAccordions}
                    dataTable={dataTable}
                    selectedStudents={selectedStudents}
                    setSelectedStudents={setSelectedStudents}
                    height={550}
                />
                <EndBlock name={nameFilter} selectedStudents={selectedStudents} mailOption={mailOption}/>
            </Container>
    );
}

export default FiltersList;