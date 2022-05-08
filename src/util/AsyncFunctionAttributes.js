import axios from "axios";
import authHeader, {
    URL_calculateAttribute,
    URL_createAttribute,
    URL_createGroupName,
    URL_deleteGroupAttribute,
    URL_getAttributeById,
    URL_getAttributes,
    URL_getAttributesCurrentStaff,
    URL_getGroupAttributes,
    URL_getGroupNamesCurrentStaff,
    URL_updateAttribute
} from "./api";
import {calculate, createListStudents} from "./Utils";

export async function fetchDataAccordion(setData, handleAccess) {
    try {
        const data = {
            "id": localStorage.getItem('idStaff'),
        }
        const dataAccordions = await axios.post(URL_getGroupAttributes, data, {headers: authHeader()});
        setData(dataAccordions.data);
    } catch (e) {
        handleAccess(403)
    }
}

export async function fetchDataAttributes(setData, handleAccess) {
    try {
        const data = {
            "id": localStorage.getItem('idStaff'),
        }
        const dataAttributes = await axios.post(URL_getAttributes, data, {headers: authHeader()});
        setData(dataAttributes.data);
    } catch (e) {
        handleAccess(403)
    }
}

export async function fetchDataFunctions(setData, handleAccess) {
    try {
        const data = {
            "id": localStorage.getItem('idStaff'),
        }
        const dataFunction = await axios.post(URL_getGroupAttributes, data, {headers: authHeader()});
        handleAccess(dataFunction.status)
        for (let group of dataFunction.data) {
            group.groupName = group.groupName.toLowerCase().replaceAll(/\s/g, '_')
            let newAttributes = []
            for (let attribute of group.attributes) {
                newAttributes.push(attribute.toLowerCase().replaceAll(/\s/g, '_'))
            }
            group.attributes = newAttributes
        }
        setData(dataFunction.data);
    } catch (e) {
        handleAccess(403)
    }
}

export async function fetchDataAttributeById(id, setName, setSGN, setExpression, setStudents, handleAccess) {
    try {
        const data = {
            "idAttribute": id
        }
        const attribute = await axios.post(URL_getAttributeById, data, {headers: authHeader()})
        setName(attribute.data.attributeName)
        setSGN(attribute.data.groupName)
        setExpression(attribute.data.expression)
        setStudents(attribute.data.studentsDTO)
    } catch (e) {
        handleAccess(403)
    }
}

export async function fetchDataAttributesCurrentStaff(setLoading, setData, handleAccess) {
    try {
        setLoading(true)
        const data = {
            "id": localStorage.getItem('idStaff')
        }
        const dataAttributes = await axios.post(URL_getAttributesCurrentStaff, data, {headers: authHeader()});
        setData(dataAttributes.data);
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}

export async function createAttribute(
    nameAttribute,
    selectedStudents,
    selectedGroupAttribute,
    setLoading,
    redirect,
    expression,
    setStatus,
    arraySelectedStudents,
    handleAccess
) {
    try {
        setLoading(true)
        let currentStatus = ""
        let students = []
        if (expression !== "" && expression !== undefined) {
            const response = await calculate(expression, URL_calculateAttribute, handleAccess)
            currentStatus = response.status
            students = createListStudents(response.students, currentStatus)
        }
        if (currentStatus === "" || currentStatus === "success") {
            if (students.length === 0) students = arraySelectedStudents(selectedStudents)
            const newAttribute = {
                "idStaff": localStorage.getItem('idStaff'),
                name: nameAttribute,
                groupName: selectedGroupAttribute,
                expression: expression,
                studentsId: students
            }
            await axios.post(URL_createAttribute, newAttribute, {headers: authHeader()})
            redirect()
        } else setStatus(currentStatus)
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}

export async function updateAttribute(
    idAttribute,
    nameAttribute,
    selectedStudents,
    selectedGroupAttribute,
    setLoading,
    redirect,
    expression,
    setStatus,
    arraySelectedStudents,
    handleAccess
) {
    try {
        setLoading(true)
        let currentStatus = ""
        let students = []
        if (expression !== "" && expression !== undefined) {
            const response = await calculate(expression, URL_calculateAttribute, handleAccess)
            currentStatus = response.status
            students = createListStudents(response.students, currentStatus)
        }
        if (currentStatus === "" || currentStatus === "success") {
            if (students.length === 0) students = arraySelectedStudents(selectedStudents)
            const newAttribute = {
                "idStaff": localStorage.getItem('idStaff'),
                idAttribute: idAttribute,
                name: nameAttribute,
                groupName: selectedGroupAttribute,
                expression: expression,
                studentsId: students
            }
            await axios.post(URL_updateAttribute, newAttribute, {headers: authHeader()})
            setLoading(false)
            redirect()
        } else setStatus(currentStatus)
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}

export async function calculateExpression(setLoading, expression, setStatus, setStudents, handleAccess) {
    try {
        setLoading(true)
        const computedExpression = await calculate(expression, URL_calculateAttribute, handleAccess)
        setStatus(computedExpression.status)
        setStudents(computedExpression.students)
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}

export async function createGroupName(groupName, setLoading, handleAccess) {
    try {
        setLoading(true)
        const data = {
            "idStaff": localStorage.getItem('idStaff'),
            "groupName": groupName
        }
        await axios.post(URL_createGroupName, data, {headers: authHeader()})
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}

export async function fetchDataGroupNames(setLoading, setData, handleAccess) {
    try {
        setLoading(true)
        const data = {
            "id": localStorage.getItem('idStaff'),
        }
        const dataGroupNames = await axios.post(URL_getGroupNamesCurrentStaff, data, {headers: authHeader()});
        setData(dataGroupNames.data);
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}

export async function deleteGroupName(id, setLoading, handleAccess) {
    try {
        setLoading(true)
        const data = {"idGroupAttribute": id}
        await axios.post(URL_deleteGroupAttribute, data, {headers: authHeader()})
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}
