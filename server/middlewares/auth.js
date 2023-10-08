import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import config from "config";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;

    //2)Check if not token
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorisation denied" });
    }

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, config.get("jwtSecret"));
      req.userId = decodedData?.id;
    } else {
      //if signed in using google
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub.toString();
      const user = await UserModel.findOne({ googleId });
      req.userId = user?._id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
