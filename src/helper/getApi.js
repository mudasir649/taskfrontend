import { api } from "./api";

const getApi = async () => {
    try {
        const res = await api.get('/');
        const result = await res.data;
        return result;
    } catch (error) {
        console.log(error);
    }
}

export default getApi;