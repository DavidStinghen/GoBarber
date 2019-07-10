import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

class AppointmentController {
  /**
   * method to store new appointments
   * validate data
   * check provider id
   * check date
   * check availability
   */
  async store(req, res) {
    // data for validation
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });
    // validate data
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    // check if provider_id is provider
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true }
    });
    if (!isProvider) {
      return res.status(401).json({
        error: 'You can only create appointments with providers'
      });
    }

    // check for past dates
    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date())) {
      return res.status(401).json({ error: 'Past dates are not permited' });
    }

    // check date availability
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      }
    });
    if (checkAvailability) {
      return res.status(401).json({ error: 'Appointment date is not available'});
    }


    // if all is ok, store a new appointment
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });
    return res.json(appointment);
  }

  /**
   * method to list all appointments
   */
  async index(req, res) {
    // query for limit number of appointments in page
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      // limit of page
      limit: 20,
      offset: (page -1) * 20,
      // include data: provider and provider's avatar
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url']
            }
          ]
        }
      ]
    });

    return res.json(appointments);
  }
}

export default new AppointmentController();
