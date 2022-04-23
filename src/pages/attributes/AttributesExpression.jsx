import React, {useEffect} from 'react';
import LoadingScreen from "../../components/LoadingScreen";
import {Container} from "@mui/material";
import HeaderBlock from "../../components/create/HeaderBlock";
import EndBlock from "../../components/create/EndBlock";
import PopupLoading from "../../components/PopupLoading";
import {useStateIfMounted} from "use-state-if-mounted";
import ExpressionBlock from "../../components/create/way-expression/ExpressionBlock";
import axios from "axios";
import PopupCheckInfo from "../../components/create/way-expression/PopupCheckInfo";
import PopupStudentsList from "../../components/create/way-expression/PopupStudentsList";

function AttributesExpression(
    {
        id,
        nameAttribute,
        setNameAttribute,
        selectedGroupName,
        setSelectedGroupName,
        setCurrentIdAttribute,
        expression,
        setExpression,
        setCreate
    }
) {

    const [dataFunctions, setDataFunctions] = useStateIfMounted([])

    const [dataAttributes, setDataAttributes] = useStateIfMounted([])

    const [students, setStudents] = useStateIfMounted(null)

    async function fetchDataFunctions() {
        const dataFunction = await axios('http://localhost:8080/attributes/getGroupAttributes');
        for (let group of dataFunction.data) {
            group.groupName = group.groupName.toLowerCase().replaceAll(/\s/g, '_')
            let newAttributes = []
            for (let attribute of group.attributes) {
                newAttributes.push(attribute.toLowerCase().replaceAll(/\s/g, '_'))
            }
            group.attributes = newAttributes
        }
        setDataFunctions(dataFunction.data);
    }

    async function fetchDataAttributeById() {
        const data = {
            "idAttribute": id
        }
        const attribute = await axios.post('http://localhost:8080/attributes/getAttributeById', data)
        setNameAttribute(attribute.data.attributeName)
        setSelectedGroupName(attribute.data.groupName)
        setExpression(attribute.data.expression)
        setStudents(attribute.data.studentsDTO)
    }

    async function fetchDataAttributesCurrentStaff() {
        setLoadingAttributes(true)
        const dataAttributes = await axios('http://localhost:8080/attributes/getAttributesCurrentStaff');
        setDataAttributes(dataAttributes.data);
        setLoadingAttributes(false)
    }

    useEffect(() => {
        fetchDataFunctions()
        fetchDataAttributesCurrentStaff()
        setCreate(true)
        if (id !== null) {
            fetchDataAttributeById()
        }
        return () => {
            setSelectedGroupName("")
            setCurrentIdAttribute(null)
            setExpression("")
            setNameAttribute("")
            setCreate(false)
        }
    }, [])

    function handleExpression(event) {
        let expr = event.target.value
        const oldLength = expression.length
        const newPosition = expr.length > oldLength ?
            event.target.selectionEnd + (expr.length - oldLength - 1)
            :
            event.target.selectionEnd - (oldLength - expr.length - 1)
        if (expr.substring(newPosition - 1, newPosition) === '(' && oldLength < expr.length) {
            expr = expr.substring(0, newPosition) + ')' + expr.substring(newPosition)
        }
        if (expr.substring(newPosition - 1, newPosition) === '[' && oldLength < expr.length) {
            expr = expr.substring(0, newPosition) + ']' + expr.substring(newPosition)
        }
        setExpression(expr)
        setPosition(newPosition)
    }


    function handleSelectedGroupName(event) {
        const groupName = event.target.value
        setSelectedGroupName(groupName)
    }

    function handleAttributesName(event) {
        const name = event.target.value
        setNameAttribute(name)
    }

    const [position, setPosition] = useStateIfMounted(0)

    const [loading, setLoading] = useStateIfMounted(false)

    const [checkAbout, setCheckAbout] = useStateIfMounted(false)

    const [infoStudents, setInfoStudents] = useStateIfMounted(false)

    const [status, setStatus] = useStateIfMounted(null)

    const [correctName, setCorrectName] = useStateIfMounted(true)

    const [unique, setUnique] = useStateIfMounted(true)

    const [loadingAttributes, setLoadingAttributes] = useStateIfMounted(false)

    const isLoading = (students === null && id !== null) || dataFunctions.length === 0 || loadingAttributes

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
                <ExpressionBlock
                    expression={expression}
                    handleExpression={handleExpression}
                    setExpression={setExpression}
                    dataFunctions={dataFunctions}
                    height={590}
                    position={position}
                    setPosition={setPosition}
                    setLoading={setLoading}
                    status={status}
                    setStatus={setStatus}
                    students={students}
                    setStudents={setStudents}
                    setCheckAbout={setCheckAbout}
                    setInfoStudents={setInfoStudents}
                />
                <EndBlock
                    name={nameAttribute}
                    selectedGroupName={selectedGroupName}
                    id={id}
                    setLoading={setLoading}
                    expression={expression}
                    setStatus={setStatus}
                    setCorrectName={setCorrectName}
                    unique={unique}
                    setUnique={setUnique}
                    data={dataAttributes}
                />
                <PopupLoading active={loading}/>
                <PopupCheckInfo active={checkAbout} setPopupActive={setCheckAbout}/>
                <PopupStudentsList active={infoStudents} setActive={setInfoStudents} students={students}/>
            </Container>
    );
}

export default AttributesExpression;