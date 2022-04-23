import React, {useContext, useEffect} from 'react';
import {PathContext} from "../context";

const ExcelLists = () => {

    const {setRootPath} = useContext(PathContext)

    useEffect(() => {
        setRootPath("Списки")
        return (() => {
            setRootPath("")
        })
    }, [])
    return (
        <div>
            <h1>ExcelLists</h1>
        </div>
    );
};

export default ExcelLists;