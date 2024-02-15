import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ error: "Fields cannot be empty" });

    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return res.status(400).json({ error: "This email is already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    generateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      profilePic: newUser.profilePic,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    console.log(req.user._id.toString());
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) return res.status(404).json({ error: "Users not found" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Fileds cannot be empty" });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ error: "Cant find user with this email!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ error: "Wrong password!" });

    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in logoutUser: " + error.message);
  }
};

export const updateCurrentUserProfile = async (req, res) => {
  let { profilePic } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ error: "User not found!" });

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.profilePic = profilePic || user.profilePic;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in updateCurrentUser: " + error.message);
  }
};

export const updateUserProfileById = async (req, res) => {
  let { profilePic } = req.body;
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) return res.status(404).json({ error: "User not found!" });

    if (user.isAdmin)
      return res
        .status(400)
        .json({ error: "You cannot update profile of admin" });

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.profilePic = profilePic || user.profilePic;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in update user as admin: " + error.message);
  }
};

export const deleteCurrentUserPofile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) res.status(404).json({ error: "User not found" });

    if (user.isAdmin) {
      return res.status(400).json({ error: "You cant delete admin user!" });
    } else {
      await User.deleteOne({ _id: user._id });
      res.cookie("jwt", "", { maxAge: 1 });
      res.status(200).json({ message: "user deleted successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in logoutUser: " + error.message);
  }
};

export const deleteUserProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) res.status(404).json({ error: "User not found" });

    if (user.isAdmin) {
      return res.status(400).json({ error: "You cant delete admin user!" });
    } else {
      await User.deleteOne({ _id: user._id });
      res.status(200).json({ message: "user deleted successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in logoutUser: " + error.message);
  }
};
