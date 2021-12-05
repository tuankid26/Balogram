import api from './api';
// import * as FileSystem from 'expo-file-system';
// import { Asset } from 'expo-asset';

// const addPost = async(postData, token) => {
//     const createResult = await api({
//         method: 'POST',
//         url: '/posts/create',
//         data: postData,
//         headers: { Authorization: `Bearer ${token}` }
//     });
//     return createResult;
// }

const getListFriend = async(token) => {
    const url = '/friends/list';
    const listFriend = await api({
        method: 'POST',
        url: url,
        headers: { Authorization: `Bearer ${token}` }
    });
    return listFriend;
}

const setRequestFriend = async(data) => {
    const token = data.token;
    const user_id = data.user_id;
    const setRequest = await api({
        method: 'POST',
        url: '/friends/set-request-friend',
        data: {
            "user_id": user_id,
        },
        headers: { Authorization: `Bearer ${token}` }
    });
    return setRequest;
}

const getRequestFriend = async(token) => {
    const url = '/friends/get-requested-friend';
    const getRequest = await api({
        method: 'POST',
        url: url,
        headers: { Authorization: `Bearer ${token}` }
    });
    return getRequest;
}

const setAcceptFriend = async(data) => {
    const token = data.token;
    const user_id = data.user_id;
    const is_accept = data.is_accept;
    const setAccept = await api({
        method: 'POST',
        url: '/friends/set-accept',
        data: {
            "user_id": user_id,
            "is_accept": is_accept,

        },
        headers: { Authorization: `Bearer ${token}` }
    });
    return setAccept;

}

const setRemoveFriend = async(data) => {
    const token = data.token;
    const user_id = data.user_id;
    const setRemove = await api({
        method: 'POST',
        url: '/friends/set-remove',
        data: {
            "user_id": user_id,
        },
        headers: { Authorization: `Bearer ${token}` }
    });
    return setRemove;

}





export {setAcceptFriend, setRemoveFriend, setRequestFriend, getListFriend,getRequestFriend};