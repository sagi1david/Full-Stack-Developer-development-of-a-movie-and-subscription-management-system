const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    memberId: String,
    movies: [{ movieId: String, date: Date }],
  },
  { versionKey: false }
);

const Subscription = mongoose.model("subscription", subscriptionSchema);

module.exports = Subscription;
