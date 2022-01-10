
import api from './api';

const getMessages = async (chatId, token) => {
    const getResult = await api({
        method: 'GET',
        url: `/chats/getMessages/${chatId}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return getResult;
}

const sendMessage = async (chatId, senderId, receiverId, msg, token) => {
    const newMessage = {
        receivedId: receiverId,
        chatId: chatId,
        member: [
            { _id: senderId },
            { _id: receiverId }
        ],
        // senderId : senderId,
        content: msg,
        type: "PRIVATE_CHAT"
    };


    const sendResult = await api({
        method: 'POST',
        url: '/chats/send/',
        data: newMessage,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return sendResult;
}

const deleteMessage = async (messageId, token) => {
    const getResult = await api({
        method: 'GET',
        url: `/chats/deleteMess/${messageId}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return getResult;
}

export { getMessages, sendMessage, deleteMessage };