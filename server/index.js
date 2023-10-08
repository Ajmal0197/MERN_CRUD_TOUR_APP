import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import config from "config";
// DB Config
const db = config.get("mongoURI");
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";

const app = express();

app.use(cors()); //CORS is a security feature implemented in web browsers that restricts web pages from making requests to a different domain than the one that served the web page.
app.use(morgan("dev")); //This line sets up middleware to log HTTP request details in a development-friendly format using the "dev" format of the morgan logger
app.use(express.json({ limit: "30mb", extended: true })); // This line configures middleware to parse incoming JSON data in HTTP requests, allowing the application to handle JSON data with a maximum size of 30 megabytes and extended functionality like nested objects.
app.use(express.urlencoded({ limit: "30mb", extended: true })); //This line sets up middleware to parse incoming URL-encoded data in HTTP requests, enabling the application to handle data submitted through HTML forms with a maximum size of 30 megabytes and extended functionality like nested objects.

//ROUTES
app.use("/api/users", userRouter); //http://localhost:5000/api/users/signup or http://localhost:5000/api/users/signin
app.use("/api/tour", tourRouter);

// app.get("/", (req, res) => {
//   res.send("HELLO MERN COURSE");
// });

mongoose
  .connect(db)
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
  })
  .catch((error) => console.log(`${error}... Did not connect`));

/**
 * Steps
 * 1) make mongoose model
 * 2) make routes(add validations if required)
 * 3) make controllers
 * 4) add to index.js
 */
