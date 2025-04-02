const { resetUsernameSchema } = require("../helpers/JoiValidation");
const User = require("../models/User");

const getFriends = async (req, res) => {
  try {
    const username = req.user;
    const user = await User.findOne({ username })
      .populate({
        path: "friends", // Populate the `user` field within `friendRequests`
        select: "displayName avatar username", // Select only the specified fields
      })
      .lean();

    if (user && user.friends) {
      return res.status(200).json({ friends: user.friends });
    }

    return res.status(201).json({ friends: [] }); // Return an empty array if no friend requests are found
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    return res.status(400).json({ error: "Error fetching friend requests:" });
  }
};

const addFriend = async (req, res) => {
  try {
    const username = req.user;

    const { friendUsername } = req.body;
    await resetUsernameSchema.validateAsync({ username: friendUsername });

    const user = await User.findOne({ username });
    const friend = await User.findOne({ username: friendUsername });

    if (!user || !friend) {
      console.error("User doesn't exist");
      return res.status(404).json({ error: "User doesn't exist" });
    }

    if (
      user.friends.includes(friend._id) ||
      friend.friends.includes(user._id)
    ) {
      console.error("Already friends!");
      return res.status(400).json({ error: "You are already friends" });
    }

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

    user.friends.push(friend._id);
    friend.friends.push(user._id);

    await user.save();
    await friend.save();

    return res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    if (error.isJoi === true) {
      console.error("Validation Failed :", error);
      return res.status(400).json({ error: "Bad Request : Validation Failed" });
    }
    console.error("Error adding friend:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const removeFriend = async (req, res) => {
  try {
    const username = req.user;
    const { id } = req.params;
    await resetUsernameSchema.validateAsync({ username: id });

    const user = User.findOne({ username });
    const friend = User.findOne({ username: id });

    if (!user || !friend) {
      console.error("User doesn't exist");
      return res.status(404).json({ error: "User doesn't exist" });
    }

    if (
      !user.friends.includes(friend._id) ||
      !friend.friends.includes(user._id)
    ) {
      console.error("Not friends!");
      return res.status(400).json({ error: "You are not friends" });
    }

    const userIndex = user.friends.indexOf(friend._id);
    const friendIndex = friend.friends.indexOf(user._id);

    if (userIndex === -1 || friendIndex === -1) {
      console.error("Friend not found");
      return res.status(404).json({ error: "Friend not found" });
    }

    user.friends.splice(userIndex, 1);
    friend.friends.splice(friendIndex, 1);

    await user.save();
    await friend.save();

    return res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    if (error.isJoi === true) {
      console.error("Bad Request : Validation Failed");
      return res.status(400).json({ error: "Bad Request : Validation Failed" });
    }
    console.error("Error removing friend:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getFriends,
  addFriend,
  removeFriend,
};
