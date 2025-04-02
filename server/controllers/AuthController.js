require("dotenv").config();
const {
  regSchema,
  authSchema,
  resetUsernameSchema,
} = require("../helpers/JoiValidation.js");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const secret = process.env.SECRET_KEY;
  const { _id, username } = user;
  const token = jwt.sign({ _id, username }, secret, { expiresIn: "1d" });
  return token;
};

const register = async (req, res) => {
  try {
    const result = await regSchema.validateAsync(req.body);

    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(result.password, 10);

    const newUser = new User({ ...result, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.isJoi === true) {
      console.log(error);
      return res.status(422).json({ error: "Bad Request : Validation Failed" });
    } else {
      console.log(error);
      return res.status(500).json({ error: "Failed to register user" });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authSchema.validateAsync(req.body);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = generateToken(user);
        res.cookie("jwt_auth", token, {
          httpOnly: false, // Accessible on Client-side
          maxAge: 86400000, // 1 day in ms
          secure: false, // Set to true if website is served over HTTPS
        });
        return res.status(200).json({ message: "User authenticated", token });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      console.log(error);
      return res.status(422).json({ error: "Bad Request : Validation Failed" });
    } else {
      console.log(error);
      return res.status(500).json({ error: "Failed to login" });
    }
  }
};

const fetchUser = async (req, res) => {
  try {
    const username = req.user;
    await resetUsernameSchema.validateAsync({ username });

    const user = await User.findOne({ username })
      .select("-password -_id")
      .populate({
        path: "friendRequests",
        select: "user incoming",
      })
      .populate({
        path: "friendRequests.user",
        select: "displayName username avatar -_id", // Exclude _id
      })
      .populate({
        path: "friends",
        select: "displayName username avatar -_id", // Exclude _id
      })
      .populate({
        path: "chats",
        populate: {
          path: "participants",
          select: "displayName username avatar -_id", // Exclude _id
        },
        select: "-_id", // Exclude _id from the chats themselves
      })
      .lean(); // Use .lean() to get plain JavaScript objects

    // Process chats to add lastMessage and unread fields and remove _id
    if (user && user.chats) {
      user.chats = user.chats.map((chat) => {
        const lastMessage = chat.messages.length
          ? chat.messages[chat.messages.length - 1].content
          : null;
        const unread = chat.messages.length
          ? !chat.messages[chat.messages.length - 1].read
          : false;

        // Identify the participant that is not the current user
        const otherParticipant = chat.participants.find(
          (participant) => participant.username !== username
        );

        return {
          displayName: otherParticipant.displayName,
          username: otherParticipant.username,
          avatar: otherParticipant.avatar,
          lastMessage,
          unread,
        };
      });
    }

    if (!user) {
      console.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    if (error.isJoi === true) {
      console.log(error);
      return res.status(422).json({ error: "Bad Request : Validation Failed" });
    }
    console.log(error);
    return res.status(400).json({ error: "Failed to fetch user" });
  }
};

module.exports = {
  register,
  login,
  fetchUser,
};
