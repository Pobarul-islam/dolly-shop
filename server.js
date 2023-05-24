import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";

// configure env
dotenv.config();

// database config
connectDB();
// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// rest api
app.get("/", (req, res) => {
  res.send("welcome to dolly server side");
});

// PORT
const PORT = process.env.PORT || 5000;

// run listen
app.listen(PORT, () => {
  console.log(`server running on ${process.env.DEV_MODE} node on port ${PORT}`);
});
