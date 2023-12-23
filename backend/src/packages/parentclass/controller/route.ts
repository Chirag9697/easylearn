//lib
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { checktoken } from '../../../utils/check-token';
//local
import * as fromusers from '../../users';
import * as fromauth from '../../authentication';
import * as fromclass from '../../classes';
dotenv.config();

const app=express();
export const router=express.Router()




