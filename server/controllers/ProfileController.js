const { resetUsernameSchema } = require("../helpers/JoiValidation");
const User = require("../models/User");

// Complete the controller functions

const getProfile = async (req, res) => {
  try {
    const username = req.user;

    await resetUsernameSchema.validateAsync({ username });
    const user = await User.findOne({ username })
      .select("username displayName avatar email -_id")
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    if (error.isJoi === true) {
      console.error("Bad Request : Valiation Failed", error);
      return res
        .status(400)
        .json({ message: "Bad Request : Validation Failed", error });
    }
    console.error("Internal Server Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {};

module.exports = {
  getProfile,
  updateProfile,
};
