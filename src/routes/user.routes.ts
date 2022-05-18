import { request, response, Router } from 'express';
import CreateUserService from '../services/user/CreateUserService';
import ensureAuthenticathed from '../middlewares/ensureAuthenticathed';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvatar from '../services/user/UpdateUserAvatar';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { email, name, password } = request.body;

  const createUser = new CreateUserService();
  const user = await createUser.execute({ email, name, password });

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticathed,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatar();
    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file?.filename!,
    });
    return response.json(user);
  },
);

export default usersRouter;
