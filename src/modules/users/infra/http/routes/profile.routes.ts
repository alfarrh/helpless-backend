import { Router } from 'express';
import ProfileController from '@modules/users/infra/controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.post('/', profileController.show);

export default profileRouter;
