import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import UserModal from "../models/user.js";
import config from "config";

const token = (result) =>
  jwt.sign({ email: result.email, id: result._id }, config.get("jwtSecret"), {
    expiresIn: "1h",
  });

export const signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password, firstname, lastname } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstname} ${lastname}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      config.get("jwtSecret"),
      { expiresIn: "3 days" }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!!!" });
    console.log("err", error);
  }
};

export const signin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      config.get("jwtSecret"),
      { expiresIn: "3 days" }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!!!" });
    console.log("err", error);
  }
};

export const googleSignIn = async (req, res) => {
  const { email, name, token, googleId } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) {
      const result = { _id: oldUser?._id + "", email, name };
      return res.status(200).json({ result, token });
    }
    const result = await UserModal.create({ email, name, googleId });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!!!" });
    console.log("err", error);
  }
};
