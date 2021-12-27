import axios from 'axios';

const axiosClient = axios.create({
<<<<<<< HEAD
    baseURL: 'http://150.230.109.159:8000/api/v1',
=======
    baseURL: 'http://192.168.1.7:8000/api/v1',

    // baseURL: 'http://150.230.109.159:8000/api/v1',
    // baseURL: 'http://duongcheckerviet.tk:8000/api/v1',
>>>>>>> 724c36ea8c6b8644445483ec544d0e1c37829e3b
    responseType: 'json',
    timeout: 10 * 1000,
});


export default axiosClient;