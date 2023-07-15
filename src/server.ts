import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./controllers/user.controller";

import { database } from "./database";
import postRoutes from "./controllers/post.controller";

dotenv.config();
database();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/public", express.static(__dirname.replace("src", "public")));

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server runs at http://localhost:${process.env.SERVER_PORT}`)
);
