import { Router } from 'express';
import TokenJWT from '../providers/TokenJWT';
import LoginController from '../controllers/login';
import LoginService from '../services/LoginService';
import { LoginMiddleware } from '../middlewares';

const router = Router();

const tokenJwt = new TokenJWT();

const loginService = new LoginService(tokenJwt);
const loginController = new LoginController(loginService);

router.post('/', LoginMiddleware.validate, loginController.login);

export default router;
