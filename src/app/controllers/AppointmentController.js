import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';
import Queue from '../../lib/Queue';
import CancellationMail from  '../jobs/CancellationMail';

class AppointmentController {
  /**
   * method to store new appointments
   * validate data
   * check provider id
   * check date
   * check availability
   * notify a provider of a new appointment
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
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    // Check if user and provider are the same
    if (req.userId === provider_id) {
      return res
        .status(401)
        .json({ error: 'You cannot create appointment to yourself' });
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

    // notify a provider about a new appointment
    const user = await User.findByPk(req.userId);
    // date format
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );
    // create a notification
    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  /**
   * method to list all appointments
   * limit of page
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

  /**
   * method to delete a appointment
   */
  async delete(req, res) {
    // check if user is equal user appointment
    const appointment = await Appointment.findByPk( req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email']
        },
        {
          model: User,
          as: 'user',
          attributes: ['name']
        }
      ],
    });
    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancel this appointment"
      });
    }

    /**
     * user can cancel appointments 2 hours in advence
     * check if is before at 2 hours advance
     */
    const dateWithSub = subHours(appointment.date, 2);
    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel appointments 2 hours in advance'
      });
    }

    // cancel appointment
    appointment.canceled_at = new Date();
    await appointment.save();

    // get job to send cancellation mail to provider
    await Queue.add(CancellationMail.key, {
      appointment,
    });

    return res.json(appointment);
  }
}



export default new AppointmentController();
