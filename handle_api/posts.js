import api from './api';

const addPost = async(postData, token) => {
    const createResult = await api({
        method: 'POST',
        url: '/posts/create',
        data: postData,
        headers: { Authorization: `Bearer ${token}` }
    });
    return createResult;
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


export {addPost, getListPost_newfeed};