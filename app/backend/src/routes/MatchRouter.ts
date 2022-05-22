import { Router } from 'express';
import TokenJWT from '../providers/TokenJWT';
import { MatchController } from '../controllers';
import { AuthMiddleware, MatchMiddleware } from '../middlewares';

const router = Router();
const tokenJwt = new TokenJWT();
tokenJwt.init();

const authMiddleware = new AuthMiddleware(tokenJwt);

router.route('/')
  .get(MatchController.findAll)
  .post(authMiddleware.execute, MatchMiddleware.validate, MatchController.create);

router.route('/:id')
  .patch(authMiddleware.execute, MatchController.update);

router.route('/:id/finish')
  .patch(authMiddleware.execute, MatchController.finishMatch);
export default router;
