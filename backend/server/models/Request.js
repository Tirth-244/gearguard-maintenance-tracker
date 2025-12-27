const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
    },
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    startDate: Date,
    endDate: Date,
    reason: String,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);