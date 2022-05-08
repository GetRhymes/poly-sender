import React, {useContext, useEffect, useState} from 'react';
import {PathContext} from "../../context";
import '../../styles/ManageData.css'
import Divider from "@mui/material/Divider";
import BackupIcon from '@mui/icons-material/Backup';
import {Button, InputAdornment, TextField} from "@mui/material";
import {update} from "../../util/AsyncFunctionAdmin";
import PopupLoading from "../../components/PopupLoading";
import {useStateIfMounted} from "use-state-if-mounted";

function DataManager() {

    const {setRootPath, handleAccess} = useContext(PathContext)

    useEffect(() => {
        setRootPath("Данные")
        return (() => {
            setRootPath("")
        })
    })

    const [status, setStatus] = useStateIfMounted(null)

    const [loading, setLoading] = useState(false)

    const [file, setFile] = useState()

    const [fileName, setFileName] = useState("")

    function handleChange(event) {
        setFile(event.target.files[0])
    }

    useEffect(() => {
        if (file !== undefined) {
            setFileName(file.name)
        }
        if (file === undefined) {
            setStatus(null)
            setFileName("")
        }
    }, [file])

    return (
        <div className="main__container__data">
            <div className="work__area__data">
                <p className="label__data">Обновить базу данных</p>
                <Divider/>
                <div className="input__component">
                    <TextField
                        disabled={true}
                        InputProps={{
                            sx: {
                                paddingRight: "0px",
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <label className="group__comp">
                                        <BackupIcon sx={{color: "white"}}/>
                                        <input type="file" hidden onChange={handleChange}/>
                                    </label>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            opacity: "1",
                            paddingRight: "0px",
                            width: "500px",
                            height: "30px",
                        }}
                        focused
                        variant="outlined"
                        value={fileName}
                        contentEditable={false}
                    />
                    <p className={getStyleByStatus(status)}>{getLabelByStatus(status)}</p>
                    <Button
                        onClick={() => {
                            if (file !== undefined) update(file, setLoading, setStatus, handleAccess)
                        }}
                        sx={{
                            width: "200px",
                            marginTop: status !== null ? "200px" : "219px",
                            paddingRight: "13px",
                            borderRadius: "30px",
                            backgroundColor: "#366ac3",
                            boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                            color: "white",
                            ":hover": {
                                color: "#ffffff",
                                backgroundColor: "#739ee8"
                            }
                        }}
                    >
                        Обновить
                    </Button>
                </div>
            </div>
            <PopupLoading active={loading}/>
        </div>
    );
}

function getLabelByStatus(status) {
    if (status === null) return ""
    if (status === "success") return "Данные успешно обновлены"
    if (status === "error") return "При обновлении произошла ошибка"
}

function getStyleByStatus(status) {
    if (status === null || status === undefined) return "data__info"
    if (status === "success") return "data__info success"
    if (status === "error") return "data__info error"
}

export default DataManager;