const mongoose = require("mongoose");
const shortId = require("shortid");

const shortUrlScheme = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  createdBy: {
    type: String,
    default: "anonymus",
  },
});

module.exports = mongoose.model("ShortUrl", shortUrlScheme);
