import axios from "axios";
import authHeader, {URL_download} from "./api";
import FileSaver from 'file-saver'

export async function downloadExcel(setLoading, id, handleAccess) {
    try {
        setLoading(true)
        const data = {
            "idStaff": localStorage.getItem('idStaff'),
            "idFilter": id,
        }
        const file = await axios.post(URL_download, data, {headers: authHeader(), responseType: 'arraybuffer'})
        const fileName = file.headers['content-disposition'].split('filename=')[1];
        const blob = new Blob(
            [file.data],
            {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
        )
        FileSaver.saveAs(blob, fileName)
        setLoading(false)
    } catch (e) {
        handleAccess(403)
    }
}