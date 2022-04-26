import axios from "axios";
import authHeader, {URL_getAllStaff} from "./api";

export async function getStaff(setData) {
    const data = { "id": localStorage.getItem('idStaff') }
    const dataStaff = await axios.post(URL_getAllStaff, data,{ headers: authHeader() })
    setData(dataStaff.data)
}