import api from './api';

const search = async (token, keyword) => {
    const getResult = await api({
        method: 'POST',
        url: `/users/search`,
        data: {
            keyword: keyword
        },
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return getResult;
}

export { search };