import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./database/database.js";
import userRouter from "./routes/userRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

const port = process.env.PORT || "9000";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB(process.env.MONGO_URI);

app.use(`/api/user`, userRouter);
app.use(`/api/category`, categoryRouter);

app.listen(port, () => {
  console.log("server is listening on port: " + port);
});
