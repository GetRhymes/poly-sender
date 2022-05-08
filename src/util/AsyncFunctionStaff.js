import axios from "axios";
import authHeader, {
    URL_acceptRequest,
    URL_changeAccess,
    URL_changePassword,
    URL_getAllStaff,
    URL_getNotifications,
    URL_rejectRequest
} from "./api";

export async function getStaff(setData, setLoading, handleAccess) {
    try {
        setLoading(true)
        const data = {"id": localStorage.getItem('idStaff')}
        const dataStaff = await axios.post(URL_getAllStaff, data, {headers: authHeader()})
        setData(dataStaff.data)
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}

export async function fetchNotification(setLoading, setData, handleAccess) {
    try {
        setLoading(true)
        const data = {
            "id": localStorage.getItem('idStaff')
        }
        const result = await axios.post(URL_getNotifications, data, {headers: authHeader()})
        setData(result.data)
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}

export async function acceptRequest(setLoading, idNotification, type, setData, setLoadFilterAfterNot, setLoadAttrAfterNot, handleAccess) {
    try {
        setLoading(true)
        setLoadAttrAfterNot(true)
        setLoadFilterAfterNot(true)
        const data = {
            "idNotification": idNotification,
            "type": type
        }
        await axios.post(URL_acceptRequest, data, {headers: authHeader()})
        await fetchNotification(setLoading, setData, handleAccess)
        setLoading(false)
        setLoadAttrAfterNot(false)
        setLoadFilterAfterNot(false)
    } catch (e) {
        handleAccess(403)
    }
}

export async function rejectRequest(setLoading, idNotification, setData, handleAccess) {
    try {
        setLoading(true)
        const data = {
            "idNotification": idNotification,
            "type": null
        }
        await axios.post(URL_rejectRequest, data, {headers: authHeader()})
        await fetchNotification(setLoading, setData, handleAccess)
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}

export async function changePassword(
    id,
    oldPassword,
    newPassword,
    setLoading,
    setStatus,
    setEquals,
    setOldPassword,
    setNewPassword,
    setRepeatNewPassword,
    handleAccess
) {
    try {
        setLoading(true)
        const data = {
            "idStaff": id,
            "oldPassword": oldPassword,
            "newPassword": newPassword
        }
        const result = await axios.post(URL_changePassword, data, {headers: authHeader()})
        const status = result.data.status
        setStatus(status)
        if (status === 'success') {
            localStorage.setItem('token', result.data.token)
            setEquals(null)
            setOldPassword("")
            setNewPassword("")
            setRepeatNewPassword("")
        }
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}

export async function changeAccess(id, setLoading, setDisable, handleAccess) {
    try {
        setLoading(true)
        const data = {
            "id": id
        }
        await axios.post(URL_changeAccess, data, {headers: authHeader()})
        setDisable(true)
        localStorage.setItem('disabled', 'true')
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}
