import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from './routes/authRoute.js'
import cors from 'cors';
// configure env
dotenv.config();

// database config
connectDB();
// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));



// routes 
app.use('/api/v1/auth', authRoutes);

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
