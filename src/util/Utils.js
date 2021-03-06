import axios from "axios";
import authHeader, {URL_attributeShare, URL_deleteAttribute, URL_deleteFilter, URL_filterShare} from "./api";

export async function calculate(expression, url, handleAccess) {
    try {
        const data = {
            "idStaff": localStorage.getItem('idStaff'),
            "expression": expression
        }
        return (await axios.post(url, data, {headers: authHeader()})).data
    } catch (e) {
        handleAccess(403)
    }
}

export function createListStudents(stud, status) {
    let students = []
    if (status === "success") {
        for (let student of stud) students.push(student.id)
    }
    return students
}

export async function deleteItem(id, setLoading, endPoint, orientation, handleAccess) {
    try {
        setLoading(true)
        const item = endPoint === "attributes" ?
            {"idAttribute": id}
            :
            {"idFilter": id}
        await axios.post(orientation === "vertical" ? URL_deleteAttribute : URL_deleteFilter, item, {headers: authHeader()})
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}

export async function share(itemId, staffIds, endPoint, handleAccess) {
    try {
        const data = {
            id: itemId,
            idCurrentStaff: localStorage.getItem('idStaff'),
            staffIds: getArrayIds(staffIds)
        }
        await axios.post(endPoint === 'attributes' ? URL_attributeShare : URL_filterShare, data, {headers: authHeader()})
    } catch (e) {
        handleAccess(403)
    }
}

function getArrayIds(selectedStaff) {
    const array = []
    for (let staff of selectedStaff) {
        array.push(staff.id)
    }
    return array
}