const Equipment = require("../models/Equipment");

exports.createEquipment = async (req, res) => {
  try {
    const { name, description, category, location, purchaseDate, value } = req.body;

    if (!name || !category) {
      return res.status(400).json({ message: "Name and category required" });
    }

    const equipment = await Equipment.create({
      name,
      description,
      category,
      location,
      purchaseDate,
      value,
      owner: req.user.id,
    });

    res.status(201).json({ success: true, message: "Equipment created", equipment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find().populate("owner", "name email");
    res.json({ success: true, equipment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id).populate("owner", "name email");
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }
    res.json({ success: true, equipment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    if (equipment.owner.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(equipment, req.body);
    await equipment.save();
    res.json({ success: true, message: "Equipment updated", equipment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    if (equipment.owner.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Equipment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Equipment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};