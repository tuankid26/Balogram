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
const setRemoveFriend = async(data)=> {
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

const getListPost_newfeed = async(token) => {
    const url = '/posts/list';
    const listPost = await api({
        method: 'GET',
        url: url,
        headers: { Authorization: `Bearer ${token}` }
    });
    return listPost;
}

const addPost = async(data) => {
    const token = data.token;
    const described = data.described;
    const images = data.images;
    const videos = data.videos;
    const postInfo = await api({
        method: 'POST',
        url: '/posts/create',
        data: {
            "described": described,
            "images": images,
            "videos": videos

        },
        headers: { Authorization: `Bearer ${token}` }
    });
    return postInfo;

}

const editPost = async(data) => {
    const token = data.token;
    const described = data.described;
    const images = data.images;
    const videos = data.videos;
    const postId = data.postId;
    const editInfo = await api({
        method: 'POST',
        url: `/posts/edit/${postId}`,
        data:{
            "described": described,
            "images": images,
            "videos": videos
        },
        headers: { Authorization: `Bearer ${token}` }
    });
    return editInfo;
}
const deletePost = async(data)=> {
    const token = data.token;
    const postId = data.postId;
    const deleteInfo = await api({
        method: "GET",
        url: `/posts/delete/${postId}`,
        headers: { Authorization: `Bearer ${token}` }
    });
    return deleteInfo;
}


export {addPost, getListPost_newfeed, editPost, deletePost,setAcceptFriend,setRemoveFriend,getListFriend,getRequestFriend};