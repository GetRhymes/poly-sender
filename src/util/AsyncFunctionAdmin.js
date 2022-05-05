import axios from "axios";
import authHeader, {URL_update} from "./api";

export async function update(file, setLoading, setStatus) {
    setLoading(true)
    let data = new FormData()
    data.append('file', file)
    const response = await axios.post(URL_update, data, { headers: authHeader() })
    setStatus(response.data.status)
    setLoading(false)
}