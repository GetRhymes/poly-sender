import axios from "axios";
import authHeader, {URL_download} from "./api";

export async function downloadExcel(setLoading, id, handleAccess) {
    try {
        // setLoading(true)
        const data = {
            "idStaff": localStorage.getItem('idStaff'),
            "idFilter": id,
        }
        const file = await axios.post(URL_download, data, {headers: authHeader()})
        // const link = document.createElement('a');
        // link.href = `your_link.pdf`;
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        // setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}