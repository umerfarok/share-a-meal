const Notification = require('../models/Notification');

exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.sub;
    const notifications = await Notification.find({ user: userId });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const newNotification = new Notification({
      user: userId,
      message,
    });

    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};