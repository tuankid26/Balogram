   
import api from './api';

const listChat = async (token) => {
    const getResult = await api({
        method: 'GET',
        url: `/chats/listChat`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return getResult;
}



export { listChat };