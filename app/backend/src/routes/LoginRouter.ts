import { Router } from 'express';
import TokenJWT from '../providers/TokenJWT';
import LoginController from '../controllers/login';
import LoginService from '../services/LoginService';
import { AuthMiddleware, LoginMiddleware } from '../middlewares';

const router = Router();

const tokenJwt = new TokenJWT();

tokenJwt.init();

const loginService = new LoginService(tokenJwt);
const loginController = new LoginController(loginService);

const authMiddleware = new AuthMiddleware(tokenJwt);

router.post('/', LoginMiddleware.validate, loginController.login);
router.get('/validate', authMiddleware.execute, loginController.validate);

export default router;
