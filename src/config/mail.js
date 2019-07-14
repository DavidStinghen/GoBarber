export default {
  // nodemailer config, using mailtrap in dev
  // when in prod, use Amazon SES
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: 'fd730d947d3bf9',
    pass: 'f16365ac888295',
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
}
