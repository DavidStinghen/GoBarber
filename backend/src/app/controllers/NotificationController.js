import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  /**
   * method to list provider's notifications 
   */
  async index(req, res) {
    // check if is a provider
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    });
    if (!isProvider) {
      return res
      .status(401)
      .json({ error: 'Only providers can load notifications' });
    }

    // list notifications
    const notifications = await Notification
      .find({ user: req.userId })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  /**
   * method to read notifications
   */
  async update(req, res) {
    const notification = await Notification
      .findByIdAndUpdate(req.params.id, { read: true }, { new: true });

    return res.json(notification);
  }
}

export default new NotificationController();