import nodemailer from 'nodemailer';
import { env } from '../envVars';

let transporter = nodemailer.createTransport({
  service: 'Outlook365', // no need to set host or port etc.
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PWD,
  },
});

// let transporter = nodemailer.createTransport({
//   service: 'Outlook365',
//   host: 'copeland-eng.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: {value},
//     pass: {value},
//   },
//   tls: { ciphers: 'SSLv3' },
// });

export const sendMail = (mailOptions) => {
  // if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
  //   return res.status(401).json({ message: 'Missing Authorization Header' });
  // }
  // console.log('In sendMail', transporter.options);

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      // res.status(500);
      // res.send(error);
      console.log(err);
    } else {
      // res.send({ message: 'done' });
      console.log(`Email sent ${res.response}`);
    }
  });
};
