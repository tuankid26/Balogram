const { PRIVATE_CHAT, GROUP_CHAT } = require("../constants/constants");
const UserModel = require("../models/Users");
const ChatModel = require("../models/Chats");
const MessagesModel = require("../models/Messages");
const httpStatus = require("../utils/httpStatus");
const chatController = {};
chatController.send = async (req, res, next) => {
  try {
    let userId = req.userId;
    const { name, chatId, receivedId, member, type, content } = req.body;
    let chatIdSend = null;
    let chat;
    if (type === PRIVATE_CHAT) {
      if (chatId) {
        chat = await ChatModel.findById(chatId);
        if (chat !== null) {
          chatIdSend = chat._id;
        }
      } else {
        chat = new ChatModel({
          type: PRIVATE_CHAT,
          member: [receivedId, userId],
        });
        await chat.save();
        chatIdSend = chat._id;
      }
    } else if (type === GROUP_CHAT) {
      if (chatId) {
        chat = await ChatModel.findById(chatId);
        if (chat !== null) {
          chatIdSend = chat._id;
        }
      } else {
        chat = new ChatModel({
          type: GROUP_CHAT,
          member: member,
        });
        await chat.save();
        chatIdSend = chat._id;
      }
    }
    if (chatIdSend) {
      if (content) {
        let message = new MessagesModel({
          chat: chatIdSend,
          user: userId,
          content: content,
        });
        await message.save();
        let messageNew = await MessagesModel.findById(message._id)
          .populate("chat")
          .populate("user");
        return res.status(httpStatus.OK).json({
          data: messageNew,
        });
      } else {
        return res.status(httpStatus.OK).json({
          data: chat,
          message: "Create chat success",
          response: "CREATE_CHAT_SUCCESS",
        });
      }
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Not chat",
      });
    }
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: e.message,
    });
  }
};
chatController.getMessages = async (req, res, next) => {
  try {
    let messages = await MessagesModel.find({
      chat: req.params.chatId,
    }).populate("user");
    return res.status(httpStatus.OK).json({
      data: messages,
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: e.message,
    });
  }
};

chatController.listChat = async (req, res, next) => {
  try {
    // console.log(req.userId);

    let Chats = await ChatModel.find({
      member: req.userId,
    });
    let listChats = [];
    for (let i = 0; i < Chats.length; i++) {
      let chatItem = Chats[i];

      let listItem = [];
      listItem.push(chatItem);

      let userId;
      chatItem.member[0] == req.userId ? userId = chatItem.member[1] : userId = chatItem.member[0];
      let user = await UserModel.findById(userId);
      listItem.push(user);

      let chatId = chatItem._id;
      let message = await MessagesModel.find({ chat: chatId });
      let messageLast = message.pop();
      listItem.push(messageLast);

      listChats.push(listItem);
    }
    return res.status(httpStatus.OK).json({
      data: listChats,
    });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

chatController.deleteMess = async (req, res, next) => {
  try {
    let mess = await MessagesModel.findByIdAndDelete(req.params.id);
    if (mess == null) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Can not find mess" });
    }
    return res.status(httpStatus.OK).json({
      message: "Delete message done",
    });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

chatController.deleteChat = async (req, res, next) => {
  try {
    let mess = await ChatModel.findByIdAndDelete(req.params.id);
    if (mess == null) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Can not find chat" });
    }
    return res.status(httpStatus.OK).json({
      message: "Delete chat done",
    });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = chatController;
