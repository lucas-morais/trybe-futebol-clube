import { Router } from 'express';
import TokenJWT from '../providers/TokenJWT';
import LoginController from '../controllers/login';
import LoginService from '../services/LoginService';

const router = Router();

const tokenJwt = new TokenJWT();

const loginService = new LoginService(tokenJwt);
const loginController = new LoginController(loginService);

router.post('/', loginController.login);

export default router;
