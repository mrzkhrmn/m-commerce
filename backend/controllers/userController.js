import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

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

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};
