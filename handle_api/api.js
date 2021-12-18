import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://192.168.1.7:8000/api/v1',

    // baseURL: 'http://150.230.109.159:8000/api/v1',
    // baseURL: 'http://duongcheckerviet.tk:8000/api/v1',
    responseType: 'json',
    timeout: 10 * 1000,
});


export default axiosClient;