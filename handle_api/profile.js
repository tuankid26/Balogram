import api from './api';

const showInfoUser = async(data) =>{
    
}
const setAvatarUser = async(data) =>{
    const avatar = data.avatar;
    const token = data.token;

    const avatarInfo = await api({
        method: 'POST',
        url: '/users/edit',
        data: {
            "avatar": avatar,
            // "images": images,
            // "videos": videos

        },
        headers: { Authorization: `Bearer ${token}` }
    });
    return avatarInfo;


}


export {setAvatarUser};