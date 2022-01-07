const postReportController = require("../controllers/PostReport");
const {asyncWrapper} = require("../utils/asyncWrapper");
const express = require("express");
const postReportRoutes = express.Router();
const auth = require("../middlewares/auth");

postReportRoutes.post(
    "/create/:postId",
    auth,
    asyncWrapper(postReportController.create),
);


postReportRoutes.get(
    "/getListReport",
    auth,
    asyncWrapper(postReportController.getListReport),
);
postReportRoutes.post(
    "/delete/:id",
    auth,
    asyncWrapper(postReportController.delete),
)

module.exports = postReportRoutes;