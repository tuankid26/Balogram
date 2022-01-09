import api from './api';

const getListReport = async (data) => {
    const token = data.token;
    const listPost = await api({
        method: 'GET',
        url: '/postReport/getListReport',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return listPost
}

const deleteReport = async (data) =>{
    const token = data.token;
    const postId = data.postId;
    const result = await api({
        method: 'POST',
        url: `/postReport/delete/${postId}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return result;
}

export { getListReport, deleteReport};

