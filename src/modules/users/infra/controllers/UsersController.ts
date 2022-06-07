import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ email, name, password });
    user.password = '';

    return response.json(user);
  }
}
