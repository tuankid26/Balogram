import api from './api';

const login = async (data) => {
    const loginInfo = await api({
        method: 'POST',
        url: '/users/login',
        data: { "phonenumber": data.phonenumber,
                "password": data.password },
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

const



export { login, register };

