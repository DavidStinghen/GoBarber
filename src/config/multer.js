import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

// upload config
export default {
  // storage uploaded files in aplication
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
    // change file name for a random hex name
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        // if all is ok, change file name
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
