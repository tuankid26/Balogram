const chatController = require("../controllers/Chats");
const {asyncWrapper} = require("../utils/asyncWrapper");
const express = require("express");
const chatsRoutes = express.Router();
const auth = require("../middlewares/auth");

chatsRoutes.post(
    "/send",
    auth,
    asyncWrapper(chatController.send),
);

chatsRoutes.get(
    "/getMessages/:chatId",
    auth,
    asyncWrapper(chatController.getMessages),
);

chatsRoutes.get(
    "/listChat",
    auth,
    asyncWrapper(chatController.listChat),
);

chatsRoutes.get(
    "/deleteMess/:id",
    auth,
    asyncWrapper(chatController.deleteMess),
);

chatsRoutes.get(
    "/deleteChat/:id",
    auth,
    asyncWrapper(chatController.deleteChat),
);

module.exports = chatsRoutes;