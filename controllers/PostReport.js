const PostReportModel = require("../models/PostReport");
const PostModel = require("../models/Posts");
const httpStatus = require("../utils/httpStatus");
const postReportController = {};
postReportController.create = async (req, res, next) => {
    try {
        let userId = req.userId;
        let post = await (await PostModel.findById(req.params.postId));
        if (post == null) {
            return res.status(httpStatus.NOT_FOUND).json({message: "Can not find post"});
        }
        const {
            subject,
            details,
        } = req.body;

        const postReport = new PostReportModel({
            user: userId,
            post: post._id,
            subject: subject,
            details: details
        });
        let postReportSaved = await postReport.save();
        postReportSaved = await PostReportModel.findById(postReportSaved._id).populate('post', ['described']).populate('user', ['username', 'phonenumber']);

        const data_find = await PostReportModel.find({}).populate('post', ['described']).populate('user', ['username', 'phonenumber']);
        // console.log(data_find);
        return res.status(httpStatus.OK).json({
            data: postReportSaved
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}


postReportController.getListReport = async (req, res) => {
    try {
        const data_find = await PostReportModel.find({}).populate('images', ['fileName']).populate('videos', ['fileName']).populate('post', ['described']).populate('user', ['username', 'phonenumber']);
        // console.log(data_find);
        return res.status(httpStatus.OK).json({
            data: data_find
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}
postReportController.delete = async (req,res, next) => {
    
    try {
        let postReport = await PostReportModel.findById(req.params.id).populate('post', ['described']);
        
        let res_reported = await PostReportModel.findByIdAndDelete(req.params.id);
        let postId = postReport.post._id;
        let result_delete = await PostModel.findByIdAndDelete(postId);
        if (res_reported == null) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "Can not find post" });
        }
        return res.status(httpStatus.OK).json({
            message: 'Delete post done',
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

module.exports = postReportController;