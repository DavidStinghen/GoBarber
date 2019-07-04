import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // get header authorization of the request
  const authHeader = req.headers.authorization;

  // verify if token got caught
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // if token got caught split bearer at token
  const [, token] = authHeader.split(' ');

  // verify if token is equal user token secret
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
