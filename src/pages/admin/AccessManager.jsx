import React, {useContext, useEffect, useState} from 'react';
import {useStateIfMounted} from "use-state-if-mounted";
import LoadingScreen from "../../components/LoadingScreen";
import '../../styles/ManageAccess.css'
import CleanBlock from "../../components/CleanBlock";
import {PathContext} from "../../context";
import AccessCenterBlock from "../../components/manage-access/AccessCenterBlock";
import AccessHeaderBlock from "../../components/manage-access/AccessHeaderBlock";
import authHeader, {URL_getAccessList, URL_getRoles} from "../../util/api";
import axios from "axios";

function AccessManager() {

    const {setRootPath, handleAccess} = useContext(PathContext)

    const [loadingAction, setLoadingAction] = useState(false)

    useEffect(() => {
        fetchDataAccess()
        fetchDataRoles()
        setRootPath("Доступы")
        return (() => {
            setRootPath("")
        })
    }, [loadingAction])

    const [dataAccess, setDataAccess] = useStateIfMounted([])

    const [dataRoles, setDataRoles] = useStateIfMounted([])

    const [loadingDataAccess, setLoadingDataAccess] = useState(false)

    const [loadingDataRoles, setLoadingDataRoles] = useState(false)

    const [search, setSearch] = useStateIfMounted(null)

    function handleSearch(event) {
        setSearch(event.target.value)
    }

    async function fetchDataAccess() {
        try {
            setLoadingDataAccess(true)
            const dataAccess = await axios.get(URL_getAccessList, {headers: authHeader()});
            setDataAccess(dataAccess.data);
            setLoadingDataAccess(false)
        } catch (e) {
            handleAccess(403)
        }
    }

    async function fetchDataRoles() {
        try {
            setLoadingDataRoles(true)
            const dataRoles = await axios.get(URL_getRoles, {headers: authHeader()});
            setDataRoles(dataRoles.data)
            setLoadingDataRoles(false)
        } catch (e) {
            handleAccess(403)
        }
    }

    const isLoading = loadingDataAccess || loadingDataRoles || loadingAction

    return (
        isLoading ?
            <LoadingScreen/>
            :
            <div className="background main__container__access">
                <AccessHeaderBlock handleSearch={handleSearch}/>
                {
                    dataAccess.length === 0 ?
                        <CleanBlock/>
                        :
                        <AccessCenterBlock
                            dataAccess={dataAccess}
                            searchValue={search}
                            dataRoles={dataRoles}
                            setLoading={setLoadingAction}
                        />
                }
            </div>
    );
}

export default AccessManager;