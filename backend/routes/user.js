import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
//import { isAuth, generateToken } from '../utils.js';
import { db, MainTable, EmailTable } from '../config.js';
import { v4 as uuidv4 } from 'uuid';

const user = express.Router();



export { user };