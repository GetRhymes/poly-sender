import React, {useContext, useEffect, useState} from 'react';
import {PathContext} from "../context";
import Divider from "@mui/material/Divider";
import '../styles/ExcelList.css'
import {Button, FormControl, InputLabel, Select} from "@mui/material";
import {useStateIfMounted} from "use-state-if-mounted";
import {fetchDataFiltersShort} from "../util/AsyncFunctionFilters";
import LoadingScreen from "../components/LoadingScreen";
import MenuItem from "@mui/material/MenuItem";
import {downloadExcel} from "../util/AsyncFunctionExcel";
import PopupLoading from "../components/PopupLoading";

const ExcelLists = () => {

    const buttonStyle = {
        width: "200px",
        marginTop: "200px",
        paddingRight: "13px",
        borderRadius: "30px",
        backgroundColor: "#366ac3",
        boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        color: "white",
        ":hover": {
            color: "#ffffff",
            backgroundColor: "#739ee8"
        }
    }

    const {setRootPath, handleAccess} = useContext(PathContext)

    const [selected, setSelected] = useStateIfMounted("")

    const [dataFilters, setDataFilters] = useStateIfMounted([])

    const [loading, setLoading] = useState(false)

    const [loadingExcel, setLoadingExcel] = useState(false)

    useEffect(() => {
        fetchDataFiltersShort(setLoading, setDataFilters, handleAccess)
        setRootPath("Списки")
        return (() => {
            setRootPath("")
        })
    }, [])


    function handleChange(event) {
        setSelected(event.target.value)
    }

    return (
        loading ?
            <LoadingScreen/>
            :
            <div className="main__container__excel">
                <div className="work__area__excel">
                    <p className="label__data">Создать список</p>
                    <Divider/>
                    <div className="selector__block">
                        <FormControl fullWidth sx={{width: "500px"}}>
                            <InputLabel>Выберите фильтр</InputLabel>
                            <Select
                                sx={{width: "500px"}}
                                value={selected}
                                label="Выберите фильтр"
                                onChange={handleChange}
                            >
                                {
                                    dataFilters.map((filter) => {
                                        return (
                                            <MenuItem
                                                key={filter.id}
                                                sx={{width: "500px"}}
                                                value={filter.id}
                                            >
                                                {filter.filterName}
                                            </MenuItem>);
                                    })
                                }
                            </Select>
                        </FormControl>
                        <Button
                            onClick={() => {
                                if (selected !== "") {
                                    downloadExcel(setLoadingExcel, selected, handleAccess)
                                }
                            }}
                            sx={buttonStyle}
                        >
                            Скачать
                        </Button>
                    </div>
                </div>
                <PopupLoading active={loadingExcel}/>
            </div>
    );
};

export default ExcelLists;