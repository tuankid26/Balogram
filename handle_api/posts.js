import api from './api';
// import * as FileSystem from 'expo-file-system';
// import { Asset } from 'expo-asset';

// const addPost = async(postData, token) => {
//     const createResult = await api({
//         method: 'POST',
//         url: '/posts/create',
//         data: postData,
//         headers: { Authorization: `Bearer ${token}` }
//     });
//     return createResult;
// }

const getListPost_newfeed = async(token) => {
    const url = '/posts/list';
    const listPost = await api({
        method: 'GET',
        url: url,
        headers: { Authorization: `Bearer ${token}` }
    });
    return listPost;
}

const addPost = async(data) => {
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
// const addImage = async(datas) => {

//     const token = data.token;
//     const pathImage = data.pathImage;
//     const imageInfo = await api({

//     })
// }


const convertToBase64 = async (data) => {
    // const mimeTypes = datas.map(data => 
    //     {
    //         const fileName = data.filename;
    //         const mediaType = asset.mediaType;
    //         return `${mediaType}/${fileNam.split('.')[1]}`;
    //     }
    //     );
    // const pathImage = data.pathImage
    // const [{ localUri }] = await Asset.loadAsync(pathImage);
    // const base64 = await FileSystem.readAsStringAsync(localUri, { encoding: 'base64' })
    // return base64;
}
export {addPost, getListPost_newfeed, convertToBase64};