import React, {useEffect, useState} from 'react';
import LoadingScreen from "../../components/LoadingScreen";
import {Container} from "@mui/material";
import HeaderBlock from "../../components/create/HeaderBlock";
import EndBlock from "../../components/create/EndBlock";
import PopupLoading from "../../components/PopupLoading";
import {useStateIfMounted} from "use-state-if-mounted";
import ExpressionBlock from "../../components/create/way-expression/ExpressionBlock";
import {dataFunction} from "../../components/data/data";

function AttributesExpression(
    {
        id,
        nameAttribute,
        setNameAttribute,
        selectedGroupName,
        setSelectedGroupName,
        setCurrentIdAttribute,
        expression,
        setExpression
    }
) {

    const [dataFunctions, setDataFunctions] = useStateIfMounted([])
    //
    // async function fetchDataFunctions() {
    //     const dataFunctions = await axios('http://localhost:8080/attributes/getFunctions')
    //     setDataFunctions(dataFunctions.data)
    // }
    //
    useEffect(() => {
        // fetchDataFunctions()
        setDataFunctions(dataFunction)
        return () => {
            setSelectedGroupName("")
            setCurrentIdAttribute(null)
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

    // const isLoading = dataFunctions.length === 0
    const isLoading = false

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
                />
                <ExpressionBlock
                    expression={expression}
                    handleExpression={handleExpression}
                    setExpression={setExpression}
                    dataFunctions={dataFunctions}
                    height={590}
                    position={position}
                    setPosition={setPosition}
                />
                <EndBlock
                    name={nameAttribute}
                    selectedGroupName={selectedGroupName}
                    id={id}
                    setLoading={setLoading}
                    expression={expression}
                />
                <PopupLoading active={loading}/>
            </Container>
    );
}

export default AttributesExpression;