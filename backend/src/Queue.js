import 'dotenv/config';
import Queue from './lib/Queue';
/**
 * method created because row will run outside the app
 */
Queue.processQueue();
