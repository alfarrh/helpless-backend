import { Router } from 'express';
import ensureAuthenticathed from '@modules/users/infra/middlewares/ensureAuthenticathed';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../../controllers/UsersController';
import { container } from 'tsyringe';
import UserAvatarController from '../../controllers/UserUpdateAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = container.resolve(UsersController);
const updateUserAvatar = container.resolve(UserAvatarController);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticathed,
  upload.single('avatar'),
  updateUserAvatar.update,
);

export default usersRouter;
