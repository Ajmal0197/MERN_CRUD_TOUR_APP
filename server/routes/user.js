import express from "express";
import { signup, signin, googleSignIn } from "../controllers/user.js";
import {
  signinValidationRules,
  signupValidationRules,
} from "../validations/index.js";
const router = express.Router();

// @route   POST api/users/signup
// @desc    User Registration
// @access  Public ie without token
router.post("/signup", signupValidationRules, signup);

// @route   POST api/users/signin
// @desc    User Sign in
// @access  Public ie without token
router.post("/signin", signinValidationRules, signin);

// @route   POST api/users/googleSignIn
// @desc    Google Sign in
// @access  Public ie without token
router.post("/googleSignIn", googleSignIn);

export default router;
