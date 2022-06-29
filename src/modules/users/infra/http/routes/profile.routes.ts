import { Router } from 'express';
import ProfileController from '@modules/users/infra/controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get('/', profileController.show);

export default profileRouter;
