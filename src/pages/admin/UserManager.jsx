import React, {useContext, useEffect, useState} from 'react';
import UsersTable from "../../components/admin/UsersTable";
import {Box} from "@mui/material";
import {useStateIfMounted} from "use-state-if-mounted";
import PopupUser from "../../components/admin/PopupUser";
import {PathContext} from "../../context";
import {fetchDataUsers} from "../../util/AsyncFunctionAdmin";
import LoadingScreen from "../../components/LoadingScreen";
import CleanBlock from "../../components/CleanBlock";

function UserManager() {


    const mainStyle = {
        height: "100%",
        display: "flex",
        justifyContent: "center"
    }

    const innerStyle = {
        marginTop: "20px"
    }

    const [dataUsers, setDataUsers] = useStateIfMounted([])

    const [loading, setLoading] = useState(false)

    const [user, setUser] = useStateIfMounted(null)

    const [index, setIndex] = useStateIfMounted(null)

    const [popupActive, setPopupActive] = useState(false)

    const {setRootPath, handleAccess} = useContext(PathContext)

    useEffect(() => {
        setRootPath("Пользователи")
        fetchDataUsers(setDataUsers, setLoading, handleAccess)
        return (() => {
            setRootPath("")
        })
    }, [])

    function handleChangeRole(admin, user) {
        const newData = dataUsers
        newData[index].admin = admin
        newData[index].user = user
        setDataUsers(newData)
    }

    console.log(dataUsers.length)

    return (
        loading ?
            <LoadingScreen/>
            :
            <Box sx={mainStyle}>
                {
                    dataUsers.length === 0 ?
                        <CleanBlock/>
                        :
                        <Box sx={innerStyle}>
                            <UsersTable
                                dataUsers={dataUsers}
                                setUser={setUser}
                                setPopupActive={setPopupActive}
                                setIndex={setIndex}
                                setLoading={setLoading}
                                setData={setDataUsers}
                            />
                        </Box>
                }
                <PopupUser active={popupActive} setActive={setPopupActive} user={user} handler={handleChangeRole}/>
            </Box>
    );
}

export default UserManager;