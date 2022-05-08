import axios from "axios";
import authHeader, {
    URL_change,
    URL_changeRoles,
    URL_deleteUser,
    URL_getUsers,
    URL_reject,
    URL_setup,
    URL_update
} from "./api";

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

export async function fetchDataUsers(setDataUsers, setLoading, handleAccess) {
    try {
        setLoading(true)
        const dataUsers = await axios.get(URL_getUsers, {headers: authHeader()})
        setDataUsers(dataUsers.data)
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}

export async function changeRoles(id, admin, user, handleAccess) {
    try {
        const roles = []
        if (admin) roles.push('ADMIN')
        if (user) roles.push('USER')
        const data = {
            "id": id,
            "roles": roles
        }
        await axios.post(URL_changeRoles, data, {headers: authHeader()})
    } catch (e) {
        handleAccess(403)
    }
}

export async function deleteUser(id, setLoading, handleAccess, setData) {
    try {
        setLoading(true)
        const data = {"id": id}
        await axios.post(URL_deleteUser, data, {headers: authHeader()})
        await fetchDataUsers(setData, setLoading, handleAccess)
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}

