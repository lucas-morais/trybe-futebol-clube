import { Router } from 'express';
import { MatchController } from '../controllers';

const router = Router();

router.route('/')
  .get(MatchController.findAll);

export default router;
