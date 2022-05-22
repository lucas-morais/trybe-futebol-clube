import { Router } from 'express';
import TokenJWT from '../providers/TokenJWT';
import { MatchController } from '../controllers';
import { AuthMiddleware } from '../middlewares';

const router = Router();
const tokenJwt = new TokenJWT();
tokenJwt.init();

const authMiddleware = new AuthMiddleware(tokenJwt);

router.route('/')
  .get(MatchController.findAll)
  .post(authMiddleware.execute);
export default router;
