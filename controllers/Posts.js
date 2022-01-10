const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");
const PostModel = require("../models/Posts");
const FriendModel = require("../models/Friends");
const DocumentModel = require("../models/Documents");
var url = require('url');
const httpStatus = require("../utils/httpStatus");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../constants/constants");
const { ROLE_CUSTOMER } = require("../constants/constants");
const uploadFile = require('../functions/uploadFile');
const getPaginationParams = require("../utils/getPaginationParams");
const usersController = require("./Users");


const postsController = {};
postsController.create = async (req, res, next) => {
    let userId = req.userId;
    try {
        const {
            described,
            images,
            videos,
        } = req.body;
        let dataImages = [];
        if (Array.isArray(images)) {
            for (const image of images) {
                if (uploadFile.matchesFileBase64(image) !== false) {
                    const imageResult = uploadFile.uploadFile(image);
                    if (imageResult !== false) {
                        let imageDocument = new DocumentModel({
                            fileName: imageResult.fileName,
                            fileSize: imageResult.fileSize,
                            type: imageResult.type
                        });
                        let savedImageDocument = await imageDocument.save();
                        if (savedImageDocument !== null) {
                            dataImages.push(savedImageDocument._id);
                        }
                    }
                }
            }
        }

        let dataVideos = [];
        if (Array.isArray(videos)) {
            for (const video of videos) {
                if (uploadFile.matchesFileBase64(video) !== false) {
                    const videoResult = uploadFile.uploadFile(video);
                    if (videoResult !== false) {
                        let videoDocument = new DocumentModel({
                            fileName: videoResult.fileName,
                            fileSize: videoResult.fileSize,
                            type: videoResult.type
                        });
                        let savedVideoDocument = await videoDocument.save();
                        if (savedVideoDocument !== null) {
                            dataVideos.push(savedVideoDocument._id);
                        }
                    }
                }
            }
        }

        const post = new PostModel({
            author: userId,
            described: described,
            images: dataImages,
            videos: dataVideos,
            countComments: 0
        });
        let postSaved = (await post.save()).populate('images').populate('videos');
        postSaved = await PostModel.findById(postSaved._id).populate('images', ['fileName']).populate('videos', ['fileName']).populate({
            path: 'author',
            select: '_id username phonenumber avatar',
            model: 'Users',
            populate: {
                path: 'avatar',
                select: '_id fileName',
                model: 'Documents',
            },
        });
        return res.status(httpStatus.OK).json({
            data: postSaved
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}
postsController.edit = async (req, res, next) => {
    try {
        let userId = req.userId;
        let postId = req.params.id;
        let postFind = await PostModel.findById(postId);
        if (postFind == null) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "Can not find post" });
        }
        if (postFind.author.toString() !== userId) {
            return res.status(httpStatus.FORBIDDEN).json({ message: "Can not edit this post" });
        }

        const {
            described,
            images,
            videos,
        } = req.body;
        let dataImages = [];
        if (Array.isArray(images)) {
            for (const image of images) {
                // check is old file
                if (image) {
                    let imageFile = !image.includes('data:') ? await DocumentModel.findById(image) : null;
                    if (imageFile == null) {
                        if (uploadFile.matchesFileBase64(image) !== false) {
                            const imageResult = uploadFile.uploadFile(image);
                            if (imageResult !== false) {
                                let imageDocument = new DocumentModel({
                                    fileName: imageResult.fileName,
                                    fileSize: imageResult.fileSize,
                                    type: imageResult.type
                                });
                                let savedImageDocument = await imageDocument.save();
                                if (savedImageDocument !== null) {
                                    dataImages.push(savedImageDocument._id);
                                }
                            }
                        }
                    } else {
                        dataImages.push(image);
                    }
                }
            }
        }

        let dataVideos = [];
        if (Array.isArray(videos)) {
            for (const video of videos) {
                // check is old file
                if (video) {
                    let videoFile = !video.includes('data:') ? await DocumentModel.findById(video) : null;
                    if (videoFile == null) {
                        if (uploadFile.matchesFileBase64(video) !== false) {
                            const videoResult = uploadFile.uploadFile(video);
                            if (videoResult !== false) {
                                let videoDocument = new DocumentModel({
                                    fileName: videoResult.fileName,
                                    fileSize: videoResult.fileSize,
                                    type: videoResult.type
                                });
                                let savedVideoDocument = await videoDocument.save();
                                if (savedVideoDocument !== null) {
                                    dataVideos.push(savedVideoDocument._id);
                                }
                            }
                        }
                    }
                }
            }
        }


        let postSaved = await PostModel.findByIdAndUpdate(postId, {
            described: described,
            images: dataImages,
            videos: dataVideos,
        });
        postSaved = await PostModel.findById(postSaved._id).populate('images', ['fileName']).populate('videos', ['fileName']).populate({
            path: 'author',
            select: '_id username phonenumber avatar',
            model: 'Users',
            populate: {
                path: 'avatar',
                select: '_id fileName',
                model: 'Documents',
            },
        });
        return res.status(httpStatus.OK).json({
            data: postSaved
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}
postsController.show = async (req, res, next) => {
    try {
        let post = await PostModel.findById(req.params.id).populate('images', ['fileName']).populate('videos', ['fileName']).populate({
            path: 'author',
            select: '_id username phonenumber avatar',
            model: 'Users',
            populate: {
                path: 'avatar',
                select: '_id fileName',
                model: 'Documents',
            },
        });
        if (post == null) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "Can not find post" });
        }
        // post = post.toObject();
        // if (post.images.length > 0) {
        //     for (let indexImage = 0; indexImage < post.images.length; indexImage++) {
        //         const base64 = uploadFile.loadFile(post.images[indexImage].fileName);
        //         // postBase64.push(base64);
        //         post.images[indexImage]["base64"] = base64;
        //         // console.log(postItem.images[indexImage]);
        //     }

        // }
        // console.log(post)
        post.isLike = post.like.includes(req.userId);
        return res.status(httpStatus.OK).json({
            data: post,
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}
postsController.delete = async (req, res, next) => {
    try {
        let post = await PostModel.findByIdAndDelete(req.params.id);
        if (post == null) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "Can not find post" });
        }
        return res.status(httpStatus.OK).json({
            message: 'Delete post done',
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

postsController.list = async (req, res, next) => {
    try {
        let posts = [];
        let userId = req.userId;
        let user = await UserModel.findById(req.userId);
      let blocked = user.blocked_diary || [];
        // console.log(user2.data.data.blocked_diary);
        // return res.status(httpStatus.OK).json({
        //     user:req.query.userId,
        // });
        // console.log("b");
        if (req.query.userId && !(req.query.userId in blocked)) {
            // get Post of one user
            // console.log("a");
            posts = await PostModel.find({
                author: req.query.userId
            }).populate('images', ['fileName']).populate('videos', ['fileName']).populate({
                path: 'author',
                select: '_id username phonenumber avatar',
                model: 'Users',
                populate: {
                    path: 'avatar',
                    select: '_id fileName',
                    model: 'Documents',
                },
            });
        } else {
            // get list friend of 1 user
            let friends = await FriendModel.find({

                status: "1",
                // _id:{ $nin: ['61dbf63c8816950ceaf8b745']  }
            }).or([
                {
                    sender: userId,

                },
                {
                    receiver: userId
                }
            ])
            let listIdFriends = [];
            console.log(friends)
            for (let i = 0; i < friends.length; i++) {
                if(blocked.findIndex(u => u == friends[i].sender) != -1) continue;
                if(blocked.findIndex(u => u == friends[i].receiver) != -1) continue;
                if (friends[i].sender.toString() === userId.toString()) {
                    listIdFriends.push(friends[i].receiver);
                } else {
                    listIdFriends.push(friends[i].sender);
                }
            }
            listIdFriends.push(userId);
            // console.log(listIdFriends);
            // get post of friends of 1 user
            posts = await PostModel.find({
                "author": listIdFriends
            }).sort({ createdAt: "desc" }).populate('images', ['fileName']).populate('videos', ['fileName']).populate({
                path: 'author',
                select: '_id username phonenumber avatar',
                model: 'Users',
                populate: {
                    path: 'avatar',
                    select: '_id fileName',
                    model: 'Documents',
                },
            });
        }
        let postWithIsLike = [];
        for (let i = 0; i < posts.length; i++) {
            let postItem = posts[i].toObject();
            let postItemLike = [];

            for (let indexIdLike = 0; indexIdLike < postItem.like.length; indexIdLike++){
                const userLikeId = String(postItem.like[indexIdLike]);
                postItemLike.push(userLikeId);
            }

            let postBase64 = []
            if (postItem.images.length > 0) {
                for (let indexImage = 0; indexImage < postItem.images.length; indexImage++) {
                    const base64 = uploadFile.loadFile(postItem.images[indexImage].fileName);
                    // postBase64.push(base64);
                    postItem.images[indexImage]["base64"] = base64;
                    // console.log(postItem.images[indexImage]);
                }

            }
            if (postItem.author.avatar){
                const fileNameAvatar = postItem.author.avatar.fileName;
                const base64 = uploadFile.loadFile(fileNameAvatar);
                postItem.author.avatar.base64 = base64;
            }
            postItem.userCall = userId;
            postItem.isLike = postItemLike.includes(userId);
            postWithIsLike.push(postItem);
        }
        return res.status(httpStatus.OK).json({
            data: postWithIsLike,
            userID: req.query.userId
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}


postsController.loadPage = async (req, res, next) => {
    try {
        let posts = [];
        let userId = req.userId;
        if (req.query.userId) {
            posts = await PostModel.find({
                author: req.query.userId
            }).populate('images', ['fileName']).populate('videos', ['fileName']).populate({
                path: 'author',
                select: '_id username phonenumber avatar',
                model: 'Users',
                populate: {
                    path: 'avatar',
                    select: '_id fileName',
                    model: 'Documents',
                },
            });
        } else {
            // get list friend of 1 user
            let friends = await FriendModel.find({
                status: "1",
            }).or([
                {
                    sender: userId
                },
                {
                    receiver: userId
                }
            ])
            let listIdFriends = [];
            // console.log(friends)
            for (let i = 0; i < friends.length; i++) {
                if (friends[i].sender.toString() === userId.toString()) {
                    listIdFriends.push(friends[i].receiver);
                } else {
                    listIdFriends.push(friends[i].sender);
                }
            }
            listIdFriends.push(userId);
            // console.log(listIdFriends);
            // get post of friends of 1 user
            const { offset, limit } = await getPaginationParams(req);
            posts = await PostModel.find({
                "author": listIdFriends
            }).skip(offset)
            .limit(limit).sort({ createdAt: "desc" }).populate('images', ['fileName']).populate('videos', ['fileName']).populate({
                path: 'author',
                select: '_id username phonenumber avatar',
                model: 'Users',
                populate: {
                    path: 'avatar',
                    select: '_id fileName',
                    model: 'Documents',
                },
            });
        }
        let postWithIsLike = [];
        for (let i = 0; i < posts.length; i++) {
            let postItem = posts[i].toObject();
            let postItemLike = [];

            for (let indexIdLike = 0; indexIdLike < postItem.like.length; indexIdLike++){
                const userLikeId = String(postItem.like[indexIdLike]);
                postItemLike.push(userLikeId);
            }

            let postBase64 = []
            if (postItem.images.length > 0) {
                for (let indexImage = 0; indexImage < postItem.images.length; indexImage++) {
                    const base64 = uploadFile.loadFile(postItem.images[indexImage].fileName);
                    // postBase64.push(base64);
                    postItem.images[indexImage]["base64"] = base64;
                    // console.log(postItem.images[indexImage]);
                }

            }
            if (postItem.author.avatar){
                const fileNameAvatar = postItem.author.avatar.fileName;
                const base64 = uploadFile.loadFile(fileNameAvatar);
                postItem.author.avatar.base64 = base64;
            }
            postItem.userCall = userId;
            postItem.isLike = postItemLike.includes(userId);
            postWithIsLike.push(postItem);
        }
        return res.status(httpStatus.OK).json({
            data: postWithIsLike,
            userID: req.query.userId
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}


module.exports = postsController;
