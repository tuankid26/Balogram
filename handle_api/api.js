import axios from 'axios';

const axiosClient = axios.create({
<<<<<<< HEAD
    baseURL: 'http://172.20.10.2:8000/api/v1',
=======
    baseURL: 'http://192.168.1.19:8000/api/v1',
>>>>>>> duong
    responseType: 'json',
    timeout: 10 * 1000,
});


export default axiosClient;