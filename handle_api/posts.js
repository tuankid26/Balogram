import api from './api';





const getListPost = async (token, userId = null) => {
    const url = userId ? `/posts/list?userId=${userId}` : '/posts/list';
    const listPost = await api({
        method: 'GET',
        url: url,
        headers: { Authorization: `Bearer ${token}` }
    });
    return listPost;
}

const getPagePost = async (token, userId = null,page = 1) => {
    const url = userId ? `/posts/loadPage?userId=${userId}&page=${page}` : `/posts/loadPage?page=${page}`;
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

const showPost = async (data) => {
    const token = data.token;
    const postId = data.postId;
    const showInfo = await api({
        method: "GET",
        url: `/posts/show/${postId}`,
        headers: { Authorization: `Bearer ${token}` }
    });
    
    return showInfo;
}

const reportPost = async (data) => {
    const token = data.token;
    const postId = data.postId;
    console.log(`/postReport/create/${postId}`);
    const reportInfo = await api({
        method: "POST",
        url: `/postReport/create/${postId}`,
        headers: { Authorization: `Bearer ${token}` }
    });
    
    return reportInfo;
}



export { addPost, getListPost,getPagePost, editPost, deletePost, actionLikePost };
