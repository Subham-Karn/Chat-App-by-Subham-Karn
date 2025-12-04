const Channel = require("../schemas/Channels");
const Message = require("../schemas/Message");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

// Auth Middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

router.get("/", authMiddleware, async (req, res) => {
  try {
    const channels = await Channel.find()
    .populate("createdBy", "email fullName")
    .populate("members", "email fullName")
    .sort({ createdAt: -1 });
    res.json(channels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { channelName, description = "" } = req.body;

    const exists = await Channel.findOne({ channelName });
    if (exists)
      return res.status(400).json({ message: "Channel already exists" });

    const channel = await Channel.create({
      channelName,
      channel_description: description,
      createdBy: req.userId,
      members: [req.userId],
    });

    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id/messages", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({ channelId: req.params.id }).sort({
      createdAt: 1,
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
