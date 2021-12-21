import api from './api';

const showInfoUser = async(data) =>{
    const token = data.token;
    const userInfo = await api({
        method: 'GET',
        url: '/users/show/',
        headers: { Authorization: `Bearer ${token}` }
    });
    return userInfo;
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

const setCoverImageUser = async(data) =>{
    const cover_image = data.coverImage;
    const token = data.token;

    const avatarInfo = await api({
        method: 'POST',
        url: '/users/edit',
        data: {
            "cover_image": cover_image,
            // "images": images,
            // "videos": videos

        },
        headers: { Authorization: `Bearer ${token}` }
    });
    return avatarInfo;


}


export {setAvatarUser, showInfoUser, setCoverImageUser};