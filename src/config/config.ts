import { config } from 'dotenv';

config();

export const ENVIRONMENT = process.env.NODE_ENV;
export const PORT = process.env.PORT || 4000;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'defaultSecretKey';
export const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;
export const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const EMAIL_HOST = process.env.EMAIL_HOST;
export const EMAIL_PORT = process.env.EMAIL_PORT;
export const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

