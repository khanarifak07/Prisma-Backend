import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({ path: ".env" });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
