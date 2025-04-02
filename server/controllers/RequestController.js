const { resetUsernameSchema } = require("../helpers/JoiValidation");
const User = require("../models/User");

const getRequests = async (req, res) => {
  try {
    const username = req.user; // Get the username from the JWT payload
    // Find the user by username and populate the friendRequests
    const user = await User.findOne({ username })
      .populate({
        path: "friendRequests",
        select: "user incoming",
      })
      .populate({
        path: "friendRequests.user", // Populate the `user` field within `friendRequests`
        select: "displayName avatar username", // Select only the specified fields
      })
      .lean();

    // If the user is found and has friend requests, map the data
    if (user && user.friendRequests) {
      return res.status(200).json({ friendRequests: user.friendRequests });
    }

    return res.status(201).json({ friendRequests: [] }); // Return an empty array if no friend requests are found
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    return res.status(400).json({ error: "Error fetching friend requests:" });
  }
};

const sendRequest = async (req, res) => {
  try {
    // Extract the usernames from the request body
    const username = req.user;
    const { friendUsername } = req.body;

    await resetUsernameSchema.validateAsync({ username: friendUsername });

    // Find the user who is sending the friend request
    const user = await User.findOne({ username });

    // Find the user who is receiving the friend request
    const friend = await User.findOne({ username: friendUsername });
    if (!friend) {
      return res.status(404).json({ error: "User does not exist" });
    }

    if (friendUsername === username) {
      return res
        .status(400)
        .json({ error: "You cannot send a friend request to yourself" });
    }

    // Check if the user and friend are already friends
    if (
      user.friends.includes(friend._id) ||
      friend.friends.includes(user._id)
    ) {
      return res.status(400).json({ error: "You are already friends" });
    }

    // Check if a friend request already exists from user to friend
    const existingRequest = user.friendRequests.find(
      (request) => request.user.toString() === friend._id.toString()
    );

    if (existingRequest) {
      return res.status(400).json({ error: "Friend request already exists" });
    }

    // If no existing request, create a new one
    user.friendRequests.push({ user: friend._id, incoming: false });
    friend.friendRequests.push({ user: user._id, incoming: true });

    // Save both users' documents
    await user.save();
    await friend.save();

    return res
      .status(200)
      .json({ message: "Friend request sent successfully" });
  } catch (error) {
    if (error.isJoi === true) {
      console.log(error);
      return res.status(422).json({ error: "Bad Request: Validation Failed" });
    }
    console.error("Error sending friend request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const username = req.user;
    const { id } = req.params;
    await resetUsernameSchema.validateAsync({ username: id });

    // Find the users
    const user = await User.findOne({ username });
    const friend = await User.findOne({ username: id });

    // Find the friend request in the user's friendRequests
    const userRequestIndex = user.friendRequests.findIndex(
      (request) => request.user.toString() === friend._id.toString()
    );
    const friendRequestIndex = friend.friendRequests.findIndex(
      (request) => request.user.toString() === user._id.toString()
    );

    if (userRequestIndex === -1 || friendRequestIndex === -1) {
      return res.status(404).json({ error: "Friend request not found." });
    }

    // Remove the friend request from both users
    user.friendRequests.splice(userRequestIndex, 1);
    friend.friendRequests.splice(friendRequestIndex, 1);

    // Save the updated users
    await user.save();
    await friend.save();

    return res
      .status(200)
      .json({ message: "Friend request deleted successfully." });
  } catch (error) {
    if (error.isJoi === true) {
      console.log(error);
      return res.status(422).json({ error: "Bad Request : Validation Failed" });
    }
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};

module.exports = {
  getRequests,
  sendRequest,
  deleteRequest,
};
