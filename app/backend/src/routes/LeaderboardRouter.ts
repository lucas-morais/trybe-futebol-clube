import { Router } from 'express';
// import { LeaderboardService } from '../services';
import { LeaderboardController } from '../controllers';

const router = Router();

// const leaderboardService = new LeaderboardService();
// const leaderboardController = new LeaderboardController(leaderboardService);

router.route('/')
  .get(LeaderboardController.leaderboard);
router.route('/home')
  .get(LeaderboardController.leaderboardHome);
router.route('/away')
  .get(LeaderboardController.leaderboardAway);

export default router;
