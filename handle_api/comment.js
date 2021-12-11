
import api from './api';

const listComment = async (token, postID) => {
    const getResult = await api({
        method: 'GET',
        url: `/postcomment/list/${postID}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return getResult;
}

const createComment = async (object) => {
    const getResult = await api({
        method: 'POST',
        url: `/postcomment/create/${object.postId}`,
        headers: {
            'Authorization': `Bearer ${object.token}`
        },
        data: {
            userId: object.userId,
            content: object.content
        }
    });
    return getResult;
}

export { listComment, createComment };