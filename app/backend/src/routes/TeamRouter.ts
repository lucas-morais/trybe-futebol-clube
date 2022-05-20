import { Router } from 'express';
import { TeamController } from '../controllers';

const router = Router();

router.route('/')
  .get(TeamController.findAll);

export default router;
