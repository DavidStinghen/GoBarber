import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  // method to list appointments for a provider
  async index(req, res) {
    // check if user is a provider
    const checkProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!checkProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    // list all appointments of a day
    const { date } = req.query;
    const parsedDate = parseISO(date);
    // find appointments
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        // verify all appointments of day
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
