import dotenv from 'dotenv';
import * as process from "process";

dotenv.config();

export const environments = {
    db_database: process.env.DB_DATABASE,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_timezone: process.env.DB_TIMEZONE,
    db_dialect: process.env.DB_DIALECT,
    db_port: process.env.DB_PORT,
    jwt_password: process.env.JWT_PASSWORD,
    mailgun_domain: process.env.MAILGUN_DOMAIN,
    mailgun_username: process.env.MAILGUN_USERNAME,
    mailgun_key: process.env.MAILGUN_KEY,
    mailgun_from: process.env.MAILGUN_FROM
};