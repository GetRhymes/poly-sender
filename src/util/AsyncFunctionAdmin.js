import axios from "axios";
import authHeader, {URL_change, URL_reject, URL_setup, URL_update} from "./api";

export async function update(file, setLoading, setStatus, handleAccess) {
    try {
        setLoading(true)
        let data = new FormData()
        data.append('file', file)
        const response = await axios.post(URL_update, data, {headers: authHeader()})
        setStatus(response.data.status)
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}

export async function access(idRequest, role, type, setLoading, handleAccess) {
    try {
        setLoading(true)
        const data = {
            "idRequest": idRequest,
            "role": role.role,
        }
        if (type === 'setup') await axios.post(URL_setup, data, {headers: authHeader()})
        if (type === 'change') await axios.post(URL_change, data, {headers: authHeader()})
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}

export async function reject(idRequest, idStaff, setLoading, handleAccess) {
    try {
        setLoading(true)
        const data = {
            "idRequest": idRequest,
            "role": null,
        }
        await axios.post(URL_reject, data, {headers: authHeader()})
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}