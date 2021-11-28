import axios from 'axios';

const axiosClient = axios.create({
<<<<<<< HEAD
    baseURL: 'http://192.168.1.8:8000/api/v1',
=======
    baseURL: 'http://192.168.0.102:8000/api/v1',
>>>>>>> pankiz
    responseType: 'json',
    timeout: 10 * 1000,
});


export default axiosClient;