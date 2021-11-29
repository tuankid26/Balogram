import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://192.168.1.8:8000/api/v1',
    responseType: 'json',
    timeout: 10 * 1000,
});


export default axiosClient;