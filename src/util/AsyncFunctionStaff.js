import axios from "axios";
import authHeader, {URL_acceptRequest, URL_getAllStaff, URL_getNotifications, URL_rejectRequest} from "./api";

export async function getStaff(setData) {
    const data = { "id": localStorage.getItem('idStaff') }
    const dataStaff = await axios.post(URL_getAllStaff, data,{ headers: authHeader() })
    setData(dataStaff.data)
}

export async function fetchNotification(setLoading, setData) {
    setLoading(true)
    const data = {
        "id": localStorage.getItem('idStaff')
    }
    const result = await axios.post(URL_getNotifications, data, { headers: authHeader() })
    setData(result.data)
    setLoading(false)
}

export async function acceptRequest(setLoading, idNotification, type) {
    setLoading(true)
    const data = {
        "idNotification": idNotification,
        "type": type
    }
    await axios.post(URL_acceptRequest, data, { headers: authHeader() })
    setLoading(false)
}

export async function rejectRequest(setLoading, idNotification, setData) {
    setLoading(true)
    const data = {
        "idNotification": idNotification,
        "type": null
    }
    await axios.post(URL_rejectRequest, data, { headers: authHeader() })
    await fetchNotification(setLoading, setData)
    setLoading(false)
}