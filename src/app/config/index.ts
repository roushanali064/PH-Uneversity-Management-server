import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_secret: process.env.JWT_ACCESS_TOKEN,
  jwt_refresh_secret: process.env.JWT_REFRESH_TOKEN,
  access_Token_expire: process.env.EXPAIR_ACCESS_TOKE,
  refresh_Token_expire: process.env.EXPAIR_REFRESH_TOKE,
  author_email: process.env.AUTHOR_EMAIL,
  author_email_password: process.env.AUTHOR_EMAIL_PASSWORD,
  reset_password_ui_link: process.env.RESET_PASSWORD_UI_LINK,
  cludinary_api_key: process.env.CLUDINARY_API_KEY,
  cludinary_api_secret: process.env.CLUDINARY_API_SECRET,
  cludinary_cloud_name: process.env.CLUDINARY_CLOUD_NAME,
};
