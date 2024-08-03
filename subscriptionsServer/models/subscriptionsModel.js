const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    memberId: String,
    movies: [{ movieId: String, date: String }],
  },
  { versionKey: false }
);

const Subscription = mongoose.model("subscription", subscriptionSchema);

module.exports = Subscription;
