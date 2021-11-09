import api from './api';

const login = async (phonenumber, password) => {
    const loginInfo = await api({
        method: 'POST',
        url: '/users/login',
        data: { phonenumber, password },
    });
    return loginInfo;
};

const register = async (data) => {
    const registerInfo = await api({
        method: 'POST',
        url: '/users/register',
        // data: { phonenumber, username, password }
        data: {
            "phonenumber": data.phonenumber,
            "username": data.username,
            "password": data.password
        }
    });
    return registerInfo
}

export { login, register };

