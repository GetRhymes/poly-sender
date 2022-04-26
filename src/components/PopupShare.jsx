import React, {useEffect} from 'react';
import '../styles/Create.css'
import {Autocomplete, Button, TextField} from "@mui/material";
import axios from "axios";
import {useStateIfMounted} from "use-state-if-mounted";
import CircularProgress from "@mui/material/CircularProgress";
import authHeader, {URL_attributeShare, URL_filterShare, URL_getAllStaff} from "../util/api";

function PopupShare({active, setActive, id, setId, endPoint}) {

    useEffect(() => {
        getStaff()
    }, [])

    async function getStaff() {
        const dataStaff = await axios.get(URL_getAllStaff, { headers: authHeader() })
        setDataStaff(dataStaff.data)
    }

    const [dataStaff, setDataStaff] = useStateIfMounted([])

    const [selectedStaff, setSelectedStaff] = useStateIfMounted([])

    const isLoading = dataStaff.length === 0

    return (
        <div className={active ? "popup active" : "popup"} onClick={() => setActive(false)}>
            {
                isLoading ?
                    <CircularProgress/>
                    :
                    <div className="popup__share__content" onClick={e => e.stopPropagation()}>
                        <div>
                            <p className="popup__label">Поделиться аттрибутом</p>
                            <div className="popup__share__body">
                                <Autocomplete
                                    sx={{marginTop: "10px"}}
                                    multiple
                                    disablePortal={true}
                                    id="tags-outlined"
                                    options={dataStaff}
                                    getOptionLabel={(option) => option.fullName}
                                    filterSelectedOptions
                                    onChange={(event, value) => setSelectedStaff(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Выберите сотрудника"
                                            placeholder="Новый сотрудник"
                                        />
                                    )}
                                />
                            </div>
                            <div className="popup__share_button">
                                <PopupShareButton text="Поделиться" action={() => {
                                    share(id, selectedStaff, endPoint)
                                    setActive(false)
                                    setId(null)
                                }}/>
                                <PopupShareButton text="Закрыть" action={() => {
                                    setActive(false)
                                }}/>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

function PopupShareButton({text, action}) {
    return (
        <Button
            sx={{
                backgroundColor: "#366ac3",
                color: "white",
                width: "120px",
                borderRadius: "13px",
                ":hover": {
                    color: "#ffffff",
                    backgroundColor: "#739ee8"
                }
            }}
            onClick={action}
        >
            {text}
        </Button>
    );
}

function getArrayIds(selectedStaff) {
    const array = []
    for (let staff of selectedStaff) {
        array.push(staff.id)
    }
    return array
}

async function share(itemId, staffIds, endPoint) {
    const data = {
        id: itemId,
        staffIds: getArrayIds(staffIds)
    }
    await axios.post(endPoint === 'attributes' ? URL_attributeShare : URL_filterShare, data, { headers: authHeader() })
}


export default PopupShare;
