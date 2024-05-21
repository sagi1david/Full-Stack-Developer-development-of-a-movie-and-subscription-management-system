const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const membersBLL = require("../subscriptionsServer/BLL/membersBLL");
const moviesBLL = require("../subscriptionsServer/BLL/moviesBLL");


const memberRouter = require("./routers/memberRouter");
const movieRouter = require("./routers/movieRouter");
const subscriptionRouter = require("./routers/subscriptionRouter");


const app = express();
const port = 3000;

connectDB();
membersBLL.membersLoadData();
moviesBLL.moviesLoadData();

app.use(cors());
app.use(express.json());

app.use("/members", memberRouter);
app.use("/movies", movieRouter);
app.use("/subscriptions", subscriptionRouter);


app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
