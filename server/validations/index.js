import { check, validationResult } from "express-validator";

// Define validation rules for each field
const signupValidationRules = [
  check("email").isEmail().withMessage("Invalid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  check("firstname").notEmpty().withMessage("First name is required"),
  check("lastname").notEmpty().withMessage("Last name is required"),
];

const signinValidationRules = [
  check("email").isEmail().withMessage("Invalid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export { signupValidationRules, signinValidationRules };
