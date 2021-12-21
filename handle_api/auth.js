import api from './api';

const login = async (data) => {
    const loginInfo = await api({
        method: 'POST',
        url: '/users/login',
        data: {
            "phonenumber": data.phonenumber,
            "password": data.password
        },
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

const changePassword = async (data) => {
    const changePasswordInfo = await api({
        method: 'POST',
        url: '/users/change-password',
        data: {
            "currentPassword": data.currentPassword,
            "newPassword": data.newPassword,
            "repeatNewPassword": data.repeatNewPassword
        },
        headers: {
            'Authorization': `Bearer ${data.token}`
        }
    })
}
const edit = async (data) => {
    const editInfo = await api({
        method: 'POST',
        url: '/users/edit',
        data: {
            'username': data.newInfo.username,
            'gender': data.newInfo.gender,
            'birthday': data.newInfo.birthday,
            'description': data.newInfo.description,
            'address': data.newInfo.address
        },
        headers: {
            'Authorization': `Bearer ${data.token}`
        }
    })
}

const getUser = async (token, ID) => {
    const info = await api({
        method: 'GET',
        url: `/users/show/${ID}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return info
}

export { login, register, changePassword, edit, getUser };

