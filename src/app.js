import cors from "cors";
import express from "express";
const app = express();

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
//import user route
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/user", userRoutes);

export { app };
