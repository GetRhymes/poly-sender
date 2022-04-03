import React, {useState} from 'react';
import LabelInBlock from "../LabelInBlock";
import VirtualizedStudentTable from "./VirtualizedStudentTable";
import PopupInfoStudent from "./PopupInfoStudent";
import AttributesAccordion from "./AttributesAccordion";
import {useStateIfMounted} from "use-state-if-mounted";

function WorkBlock(
    {
        dataAccordions,
        dataTable,
        selectedStudents,
        setSelectedStudents,
        height,
    }) {

    const [popupActiveState, setPopupActiveState] = useState(false)

    const [sample, setSample] = useStateIfMounted({})

    function handleSample({name, id, value}) {
        let temp = {...sample}
        if (temp[name] === undefined) temp[name] = [id]
        else if (value) {
            temp[name].push(id)
        } else {
            temp[name].splice(temp[name].indexOf(id), 1)
            if (temp[name].length === 0) delete temp[name]
        }
        setSample(temp)
    }

    let sampleDataTable = []

    function includesArray(arrayAttr, arrayStudAttr) {
        let isInclude = false
        for (let studAttr of arrayStudAttr) {
            isInclude = arrayAttr.includes(studAttr)
            if (isInclude) break
        }
        return isInclude
    }
    if (Object.keys(sample).length) {
        for (let data of dataTable) {
            const first = Object.entries(sample)[0]
            if (includesArray(first[1], data.attributes[first[0]])) {
                sampleDataTable.push(data)
            }
        }
        if (Object.keys(sample).length > 1 && sampleDataTable.length !== 0) {
            let temp = [...sampleDataTable]
            let sampleWithOutFirst = Object.entries(sample)
            sampleWithOutFirst.splice(0, 1)
            for (let item of sampleDataTable) {
                for (let groupAttributes of sampleWithOutFirst) {
                    if (!includesArray(groupAttributes[1], item.attributes[groupAttributes[0]])) {
                        temp.splice(temp.indexOf(item), 1)
                    }
                }
            }
            sampleDataTable = temp
        }
    } else {
        sampleDataTable = dataTable
    }

    const [info, setInfo] = useState({})

    function handleInfoStudent(id) {
        for (let student of sampleDataTable) {
            if (student.id === id) setInfo(student)
        }
    }

    // console.log(selectedStudents)

    return (
        <div className="double__block">
            <div className="background__card">
                <LabelInBlock label={"Студенты"}/>
                <VirtualizedStudentTable
                    popupActive={popupActiveState}
                    setPopupActive={setPopupActiveState}
                    dataTable={sampleDataTable}
                    selectedStudents={selectedStudents}
                    setSelectedStudents={setSelectedStudents}
                    height={height}
                    setCurrentId={handleInfoStudent}
                />
                <PopupInfoStudent
                    popupActive={popupActiveState}
                    setPopupActive={setPopupActiveState}
                    info={info}
                    attributes={dataAccordions}
                />
            </div>
            <div className="background__card">
                <LabelInBlock label={"Атрибуты"}/>
                <AttributesAccordion
                    dataAccordions={dataAccordions}
                    setSample={handleSample}
                    height={height}
                />
            </div>
        </div>
    );
}

export default WorkBlock;