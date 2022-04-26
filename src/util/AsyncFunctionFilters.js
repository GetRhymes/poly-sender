import axios from "axios";
import authHeader, {
    URL_calculateFilter,
    URL_createFilter, URL_getEmails, URL_getFilterById,
    URL_getFilters,
    URL_getFiltersShort,
    URL_updateFilter
} from "./api";
import {calculate, createListStudents} from "./Utils";

export async function createFilter(
    nameFilter,
    selectedStudents,
    mailOption,
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
        const response = await calculate(expression, URL_calculateFilter)
        currentStatus = response.status
        students = createListStudents(response.students, currentStatus)
    }
    if (currentStatus === "" || currentStatus === "success") {
        if (students.length === 0) students = arraySelectedStudents(selectedStudents)
        const newFilter = {
            "idStaff": localStorage.getItem('idStaff'),
            name: nameFilter,
            mailOption: mailOption,
            expression: expression,
            studentsId: students
        }
        await axios.post(URL_createFilter, newFilter, { headers: authHeader() })
        setLoading(false)
        redirect()
    } else setStatus(currentStatus)
    setLoading(false)
}

export async function updateFilter(
    idFilter,
    nameFilter,
    selectedStudents,
    mailOption,
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
        const response = await calculate(expression, URL_calculateFilter)
        currentStatus = response.status
        students = createListStudents(response.students, currentStatus)
    }
    if (currentStatus === "" || currentStatus === "success") {
        if (students.length === 0) students = arraySelectedStudents(selectedStudents)
        const newFilter = {
            "idStaff": localStorage.getItem('idStaff'),
            idFilter: idFilter,
            name: nameFilter,
            mailOption: mailOption,
            expression: expression,
            studentsId: students
        }
        await axios.post(URL_updateFilter, newFilter, { headers: authHeader() })
        setLoading(false)
        redirect()
    } else setStatus(currentStatus)
    setLoading(false)
}

export async function fetchDataFiltersShort(setLoading, setData) {
    setLoading(true)
    const data = {
        "id": localStorage.getItem('idStaff'),
    }
    const dataFilters = await axios.post(URL_getFiltersShort, data,{ headers: authHeader() });
    setData(dataFilters.data);
    setLoading(false)
}

export async function fetchDataFilters(setLoading, setData) {
    setLoading(true)
    const data = {
        "id": localStorage.getItem('idStaff'),
    }
    const dataFilters = await axios.post(URL_getFilters, data,{ headers: authHeader() });
    setData(dataFilters.data)
    setLoading(false)
}

export async function fetchDataFilterById(id, setName, setSMO, setExpression, setStudents) {
    const data = {
        "idFilter": id
    }
    const filter = await axios.post(URL_getFilterById, data, { headers: authHeader() })
    setName(filter.data.filterName)
    setSMO(filter.data.mode)
    setExpression(filter.data.expression)
    setStudents(filter.data.studentsDTO)
}

export async function getEmails(id, setLoading) {
    setLoading(true)
    const data = {
        "idFilter": id
    }
    await axios.post(URL_getEmails, data, { headers: authHeader() })
    setLoading(false)
}