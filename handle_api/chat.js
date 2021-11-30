   
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

const deleteChat = async (chatId, token) => {
    const getResult = await api({
        method: 'GET',
        url: `/chats/deleteChat/${chatId}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return getResult;
}



export { listChat,deleteChat };