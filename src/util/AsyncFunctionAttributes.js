import axios from "axios";
import authHeader, {
    URL_calculateAttribute, URL_createAttribute, URL_createGroupName, URL_deleteGroupAttribute,
    URL_getAttributeById,
    URL_getAttributes,
    URL_getAttributesCurrentStaff,
    URL_getGroupAttributes, URL_getGroupNamesCurrentStaff, URL_updateAttribute
} from "./api";
import {calculate, createListStudents} from "./Utils";

export async function fetchDataAccordion(setData) {
    const data = {
        "id": localStorage.getItem('idStaff'),
    }
    const dataAccordions = await axios.post(URL_getGroupAttributes, data, { headers: authHeader() });
    setData(dataAccordions.data);
}

export async function fetchDataAttributes(setData) {
    const data = {
        "id": localStorage.getItem('idStaff'),
    }
    const dataAttributes = await axios.post(URL_getAttributes, data, { headers: authHeader() });
    setData(dataAttributes.data);
}

export async function fetchDataFunctions(setData) {
    const data = {
        "id": localStorage.getItem('idStaff'),
    }
    const dataFunction = await axios.post(URL_getGroupAttributes, data,{ headers: authHeader() });
    for (let group of dataFunction.data) {
        group.groupName = group.groupName.toLowerCase().replaceAll(/\s/g, '_')
        let newAttributes = []
        for (let attribute of group.attributes) {
            newAttributes.push(attribute.toLowerCase().replaceAll(/\s/g, '_'))
        }
        group.attributes = newAttributes
    }
    setData(dataFunction.data);
}

export async function fetchDataAttributeById(id, setName, setSGN, setExpression, setStudents) {
    const data = {
        "idAttribute": id
    }
    const attribute = await axios.post(URL_getAttributeById, data, { headers: authHeader() })
    setName(attribute.data.attributeName)
    setSGN(attribute.data.groupName)
    setExpression(attribute.data.expression)
    setStudents(attribute.data.studentsDTO)
}

export async function fetchDataAttributesCurrentStaff(setLoading, setData) {
    setLoading(true)
    const data = {
        "id": localStorage.getItem('idStaff')
    }
    const dataAttributes = await axios.post(URL_getAttributesCurrentStaff, data,{ headers: authHeader() });
    setData(dataAttributes.data);
    setLoading(false)
}

export async function createAttribute(
    nameAttribute,
    selectedStudents,
    selectedGroupAttribute,
    setLoading,
    redirect,
    expression,
    setStatus,
    arraySelectedStudents
) {
    setLoading(true)
    let currentStatus = ""
    let students = []
    if (expression !== "" && expression !== undefined) {
        const response = await calculate(expression, URL_calculateAttribute)
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
        await axios.post(URL_createAttribute, newAttribute, { headers: authHeader() })
        redirect()
    } else setStatus(currentStatus)
    setLoading(false)
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
    arraySelectedStudents
) {
    setLoading(true)
    let currentStatus = ""
    let students = []
    if (expression !== "" && expression !== undefined) {
        const response = await calculate(expression, URL_calculateAttribute)
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
        await axios.post(URL_updateAttribute, newAttribute, { headers: authHeader() })
        setLoading(false)
        redirect()
    } else setStatus(currentStatus)
    setLoading(false)
}

export async function calculateExpression(setLoading, expression, setStatus, setStudents) {
    setLoading(true)
    const computedExpression = await calculate(expression, URL_calculateAttribute)
    setStatus(computedExpression.status)
    setStudents(computedExpression.students)
    setLoading(false)
}

export async function createGroupName(groupName, setLoading) {
    setLoading(true)
    const data = {
        "idStaff": localStorage.getItem('idStaff'),
        "groupName": groupName
    }
    await axios.post(URL_createGroupName, data, { headers: authHeader() })
    setLoading(false)
}

export async function fetchDataGroupNames(setLoading, setData) {
    setLoading(true)
    const data = {
        "id": localStorage.getItem('idStaff'),
    }
    const dataGroupNames = await axios.post(URL_getGroupNamesCurrentStaff, data, { headers: authHeader() });
    setData(dataGroupNames.data);
    setLoading(false)
}

export async function deleteGroupName(id, setLoading) {
    setLoading(true)
    const data = { "idGroupAttribute": id }
    await axios.post(URL_deleteGroupAttribute, data, { headers: authHeader() })
    setLoading(false)
}
