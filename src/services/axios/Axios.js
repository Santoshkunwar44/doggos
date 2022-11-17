import axios from "axios"

const axiosRef = axios.create({
    baseURL: 'https://dog.ceo/api',
    timeout: 1000,
});


export default axiosRef;