import axios from "axios";
import authHeader, {URL_getAllStudents} from "./api";

export async function fetchDataTable(setData) {
    console.log(localStorage.getItem('idStaff'))
    const data = { "id": localStorage.getItem('idStaff') }
    const dataTable = await axios.post(URL_getAllStudents, data, { headers: authHeader() });
    setData(dataTable.data);
}
