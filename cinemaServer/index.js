const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRouter = require("./routers/authRouter");
const memberRouter = require("./routers/memberRouter");
const movieRouter = require("./routers/movieRouter");
const permissionRouter = require("./routers/permissionRouter");
const subscriptionRouter = require("./routers/subscriptionRouter");
const userRouter = require("./routers/userRouter");


const app = express();
const port = 4000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/members", memberRouter);
app.use("/movies", movieRouter);
app.use("/permissions", permissionRouter);
app.use("/subscriptions", subscriptionRouter);
app.use("/users", userRouter);


app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
