const User = require("../models/User");
const Chat = require("../models/Chat");
const { resetUsernameSchema } = require("../helpers/JoiValidation");

const getChats = async (req, res) => {
  try {
    const username = req.user;

    await resetUsernameSchema.validateAsync({ username });

    const userChats = await User.findOne({ username })
      .select("chats") // Only select the chats field
      .populate({
        path: "chats",
        populate: {
          path: "participants",
          select: "username", // Only populate the username field
        },
      })
      .lean(); // Convert the Mongoose document to a plain JavaScript object

    console.log("Successfully got chats");
    res.status(200).json(userChats.chats);
  } catch (error) {
    if (error.isJoi === true) {
      console.error("Bad Request : Validation Failed");
      res
        .status(400)
        .json({ message: "Bad Request : Validation Failed", error });
    } else {
      console.error("Failed to get chats", error);
      res.status(500).json({ message: "Failed to get chats", error });
    }
  }
};

const getChat = async (req, res) => {
  try {
    const username = req.user;
    const { id } = req.params;
    await resetUsernameSchema.validateAsync({ username });
    await resetUsernameSchema.validateAsync({ username: id });

    const user = await User.findOne({ username });
    const friendUser = await User.findOne({ username: id });

    const participants = [user._id, friendUser._id];
    const chat = await Chat.findOne({ participants: participants })
      .populate({
        path: "participants",
        select: "username",
      })
      .populate({
        path: "messages.sender",
        select: "username",
      })
      .lean();

    if (!chat) {
      console.error("Chat not found");
      return res.status(404).json({ message: "Chat not found" });
    }

    if (chat.messages == []) {
      console.log("Chat is empty");
      return res.status(200).json({ chat: chat });
    }

    console.log("Successfully got chat");
    res.status(200).json({ chat: chat });
  } catch (error) {
    if (error.isJoi === true) {
      console.error("Bad Request : Validation Failed", error);
      res
        .status(400)
        .json({ message: "Bad Request : Validation Failed", error });
    } else {
      console.error("Failed to get chats", error);
      res.status(500).json({ message: "Failed to get chats", error });
    }
  }
};

const clearChat = async (req, res) => {
  try {
    const username = req.user;
    const { friend } = req.body;

    await resetUsernameSchema.validateAsync({ username });
    await resetUsernameSchema.validateAsync({ friend });

    const user = await User.findOne({ username });
    const friendUser = await User.findOne({ username: friend });

    await Chat.findOneAndUpdate(
      { participants: { $all: [user._id, friendUser._id] } }, // Find the chat with both participants
      { $set: { messages: [] } } // Clear the messages array
    );

    console.log("Successfully cleared chat");
    res.status(200).json({ message: "Successfully cleared chat" });
  } catch (error) {
    if (error.isJoi === true) {
      console.error("Bad Request : Validation Failed");
      res
        .status(400)
        .json({ message: "Bad Request : Validation Failed", error });
    } else {
      console.error("Failed to clear chat", error);
      res.status(500).json({ message: "Failed to clear chat", error });
    }
  }
};

const sendMessage = async (req, res) => {
  try {
    const username = req.user;
    const { friend, message } = req.body;

    await resetUsernameSchema.validateAsync({ username });
    await resetUsernameSchema.validateAsync({ friend });

    const user = await User.findOne({ username });
    const friendUser = await User.findOne({ username: friend });

    if (
      !user.friends.includes(friend._id) ||
      !friend.friends.includes(user._id)
    ) {
      console.error("You are not friends");
      return res.status(404).json({ message: "Not friends with this user" });
    }

    const chat = await Chat.findOne({
      participants: { $all: [user._id, friendUser._id] },
    });

    if (chat) {
      chat.messages.push({
        content: message,
        sender: user._id,
        read: false,
        time: Date.now(),
      });

      await chat.save();
    } else {
      const newChat = new Chat({
        participants: [user._id, friendUser._id],
        messages: [
          {
            content: message,
            sender: user._id,
            read: false,
            time: Date.now(),
          },
        ],
      });

      await newChat.save();

      await User.updateOne(
        { _id: user._id },
        { $push: { chats: newChat._id } }
      );

      await User.updateOne(
        { _id: friendUser._id },
        { $push: { chats: newChat._id } }
      );
    }

    console.log("Successfully sent message");
    res.status(200).json({ message: "Successfully sent message" });
  } catch (error) {
    if (error.isJoi === true) {
      console.error("Bad Request : Validation Failed");
      res
        .status(400)
        .json({ message: "Bad Request : Validation Failed", error });
    } else {
      console.error("Failed to send message", error);
      res.status(500).json({ message: "Failed to send message", error });
    }
  }
};

// remove the unread number on client side
const readMessage = async (req, res) => {
  try {
    const username = req.user;
    const { friend } = req.body;

    await resetUsernameSchema.validateAsync({ username });
    await resetUsernameSchema.validateAsync({ friend });

    const user = await User.findOne({ username });
    const friendUser = await User.findOne({ username: friend });

    if (
      !user.friends.includes(friend._id) ||
      !friend.friends.includes(user._id)
    ) {
      console.error("You are not friends");
      return res.status(404).json({ message: "Not friends with this user" });
    }

    const chat = await Chat.findOne({
      participants: { $all: [user._id, friendUser._id] },
    });

    if (!chat) {
      console.error("Chat not found");
      return res.status(404).json({ message: "Chat not found" });
    }

    await Chat.updateOne(
      {
        _id: chat._id,
        "messages.sender": friendUser._id,
        "messages.read": false,
      },
      { $set: { "messages.$[elem].read": true } },
      { arrayFilters: [{ "elem.sender": friendUser._id, "elem.read": false }] }
    );

    chat.save();
    console.log("Successfully read message");
    res.status(200).json({ message: "Successfully read message" });
  } catch (error) {
    if (error.isJoi === true) {
      console.error("Bad Request : Validation Failed");
      res
        .status(400)
        .json({ message: "Bad Request : Validation Failed", error });
    } else {
      console.error("Failed to read message", error);
      res.status(500).json({ message: "Failed to read message", error });
    }
  }
};

const deleteChat = async (req, res) => {
  try {
    const username = req.user;
    const { id } = req.params;

    await resetUsernameSchema.validateAsync({ username });
    await resetUsernameSchema.validateAsync({ username: id });

    const user = await User.findOne({ username });
    const friendUser = await User.findOne({ username: id });

    const deletedChat = await Chat.findOneAndDelete({
      participants: { $all: [user._id, friendUser._id] },
    });

    if (deletedChat) {
      // Remove the chat reference from the first user
      await User.updateOne(
        { _id: user._id },
        { $pull: { chats: deletedChat._id } }
      );

      // Remove the chat reference from the second user
      await User.updateOne(
        { _id: friendUser._id },
        { $pull: { chats: deletedChat._id } }
      );
    }

    console.log("Successfully deleted chat");
    res.status(200).json({ message: "Successfully deleted chat" });
  } catch (error) {
    if (error.isJoi === true) {
      console.error("Bad Request : Validation Failed");
      res
        .status(400)
        .json({ message: "Bad Request : Validation Failed", error });
    } else {
      console.error("Failed to delete chat", error);
      res.status(500).json({ message: "Failed to delete chat", error });
    }
  }
};

module.exports = {
  getChats,
  getChat,
  clearChat,
  sendMessage,
  readMessage,
  deleteChat,
};
