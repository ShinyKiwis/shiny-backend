import App from './app';
import validateEnv from './utils/validateEnv';
import * as dotenv from 'dotenv';
import UserController from 'controllers/users/users.controller';

dotenv.config();
validateEnv();

const app = new App([new UserController()]);

app.listen();
