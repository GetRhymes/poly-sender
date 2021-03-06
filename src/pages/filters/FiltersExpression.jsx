import React, {useContext, useEffect, useState} from 'react';
import {useStateIfMounted} from "use-state-if-mounted";
import LoadingScreen from "../../components/LoadingScreen";
import {Container} from "@mui/material";
import HeaderBlock from "../../components/create/HeaderBlock";
import ExpressionBlock from "../../components/create/way-expression/ExpressionBlock";
import EndBlock from "../../components/create/EndBlock";
import PopupLoading from "../../components/PopupLoading";
import PopupCheckInfo from "../../components/create/way-expression/PopupCheckInfo";
import PopupStudentsList from "../../components/create/way-expression/PopupStudentsList";
import {PathContext} from "../../context";
import {fetchDataFunctions} from "../../util/AsyncFunctionAttributes";
import {fetchDataFilterById, fetchDataFilters} from "../../util/AsyncFunctionFilters";

function FiltersExpression(
    {
        id,
        setId,
        nameFilter,
        setNameFilter,
        expression,
        setExpression,
        selectedMailOption,
        setSelectedMailOption,
    }
) {

    const [dataFunctions, setDataFunctions] = useStateIfMounted([])

    const [students, setStudents] = useStateIfMounted(null)

    const [dataFilters, setDataFilters] = useStateIfMounted([])

    const {setRootPath, setCreate, handleAccess} = useContext(PathContext)

    useEffect(() => {
        setRootPath("Фильтры")
        setCreate(true)
        fetchDataFilters(setLoadingDataFilters, setDataFilters, handleAccess)
        fetchDataFunctions(setDataFunctions, handleAccess)
        if (id !== null) fetchDataFilterById(id, setNameFilter, setSelectedMailOption, setExpression, setStudents, handleAccess)
        return () => {
            setSelectedMailOption("")
            setId(null)
            setExpression("")
            setNameFilter("")
            setCreate(false)
            setRootPath("")
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


    function handleMailOption(event) {
        setSelectedMailOption(event.target.value)
    }

    function handleFilterName(event) {
        const name = event.target.value
        setNameFilter(name)
    }

    const [position, setPosition] = useStateIfMounted(0)

    const [loading, setLoading] = useStateIfMounted(false)

    const [checkAbout, setCheckAbout] = useStateIfMounted(false)

    const [infoStudents, setInfoStudents] = useStateIfMounted(false)

    const [status, setStatus] = useStateIfMounted(null)

    const [correctName, setCorrectName] = useStateIfMounted(true)

    const [unique, setUnique] = useStateIfMounted(true)

    const [loadingDataFilters, setLoadingDataFilters] = useState(false)

    const isLoading = (students === null && id !== null) || dataFunctions.length === 0 || loadingDataFilters

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
                <ExpressionBlock
                    expression={expression}
                    handleExpression={handleExpression}
                    setExpression={setExpression}
                    dataFunctions={dataFunctions}
                    height={550}
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
                    name={nameFilter}
                    mailOption={selectedMailOption}
                    id={id}
                    setLoading={setLoading}
                    expression={expression}
                    setStatus={setStatus}
                    setCorrectName={setCorrectName}
                    unique={unique}
                    setUnique={setUnique}
                    data={dataFilters}
                />
                <PopupLoading active={loading}/>
                <PopupCheckInfo active={checkAbout} setPopupActive={setCheckAbout}/>
                <PopupStudentsList active={infoStudents} setActive={setInfoStudents} students={students}/>
            </Container>
    );
}

export default FiltersExpression;