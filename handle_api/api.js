import axios from 'axios';

const axiosClient = axios.create({
    // baseURL: 'http://192.168.1.153:8000/api/v1',
    
    // baseURL: 'http://192.168.1.29:8000/api/v1',
    baseURL: 'http://150.230.98.85:8000/api/v1',
    // baseURL: "http://140.238.58.32:8000/api/v1",
    responseType: 'json',
    timeout: 10 * 1000,
});

const SOCKET_URL = "http://150.230.98.85:3000/api/v1";
// const SOCKET_URL = "http://140.238.58.32:3000/api/v1";
export default axiosClient;