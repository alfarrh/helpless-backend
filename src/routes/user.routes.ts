import { request, response, Router } from 'express';
import CreateUserService from '../services/user/CreateUserUseCase/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { email, name, password } = request.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({ email, name, password });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err });
  }
});

export default usersRouter;
