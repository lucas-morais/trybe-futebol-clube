import { Router } from 'express';
import { LeaderboardService } from '../services';
import { LeaderboardController } from '../controllers';

const router = Router();

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

router.route('/')
  .get(leaderboardController.leaderboard);
router.route('/home')
  .get(leaderboardController.leaderboardHome);
router.route('/away')
  .get(leaderboardController.leaderboardAway);

export default router;
