const Request = require("../models/Request");
const Equipment = require("../models/Equipment");

exports.createRequest = async (req, res) => {
  try {
    const { equipment, startDate, endDate, reason } = req.body;

    if (!equipment) {
      return res.status(400).json({ message: "Equipment ID required" });
    }

    const equip = await Equipment.findById(equipment);
    if (!equip) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    const request = await Request.create({
      equipment,
      requester: req.user.id,
      startDate,
      endDate,
      reason,
    });

    await request.populate([
      { path: "equipment", select: "name" },
      { path: "requester", select: "name email" },
    ]);

    res.status(201).json({ success: true, message: "Request created", request });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate([
      { path: "equipment", select: "name description" },
      { path: "requester", select: "name email" },
    ]);
    res.json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate([
      { path: "equipment", select: "name description" },
      { path: "requester", select: "name email" },
    ]);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.json({ success: true, request });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    request.status = status;
    await request.save();
    await request.populate([
      { path: "equipment", select: "name" },
      { path: "requester", select: "name email" },
    ]);

    res.json({ success: true, message: "Request updated", request });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.requester.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Request.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Request deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};