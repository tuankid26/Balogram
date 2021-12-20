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

const getListPost_newfeed = async (token, userId = null) => {
    const url = userId ? `/posts/list?userId=${userId}` : '/posts/list';
    const listPost = await api({
        method: 'GET',
        url: url,
        headers: { Authorization: `Bearer ${token}` }
    });
    return listPost;
}


const addPost = async (data) => {
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

const editPost = async (data) => {
    const token = data.token;
    const described = data.described;
    const images = data.images;
    const videos = data.videos;
    const postId = data.postId;
    const editInfo = await api({
        method: 'POST',
        url: `/posts/edit/${postId}`,
        data: {
            "described": described,
            "images": images,
            "videos": videos
        },
        headers: { Authorization: `Bearer ${token}` }
    });
    return editInfo;
}
const deletePost = async (data) => {
    const token = data.token;
    const postId = data.postId;
    const deleteInfo = await api({
        method: "GET",
        url: `/posts/delete/${postId}`,
        headers: { Authorization: `Bearer ${token}` }
    });
    return deleteInfo;
}

const actionLikePost = async (data) => {
    const token = data.token;
    const postId = data.postId;
    const likeInfo = await api({
        method: "POST",
        url: `/postLike/action/${postId}`,
        headers: { Authorization: `Bearer ${token}` }
    });
    return likeInfo;
}



export { addPost, getListPost_newfeed, editPost, deletePost, actionLikePost };