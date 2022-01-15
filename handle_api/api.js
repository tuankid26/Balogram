import axios from 'axios';

const axiosClient = axios.create({
    // baseURL: 'http://150.230.98.85:8000/api/v1',
    // baseURL: 'http://192.168.1.153:8000/api/v1',
    
    // baseURL: 'http://192.168.1.19:8000/api/v1',
    baseURL: 'http://150.230.98.85:8000/api/v1',

    responseType: 'json',
    timeout: 10 * 1000,
});

export const SOCKET_URL = "http://150.230.98.85:3000";
// export const SOCKET_URL = "http://192.168.1.153:3000";
export default axiosClient;
