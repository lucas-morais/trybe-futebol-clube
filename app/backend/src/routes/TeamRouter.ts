import { Router } from 'express';
import { TeamController } from '../controllers';

const router = Router();

router.route('/')
  .get(TeamController.findAll);

router.route('/:id')
  .get(TeamController.findById);

export default router;
