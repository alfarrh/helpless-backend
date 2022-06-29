import { Request, Response } from 'express';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body;

    const showProfile = new ShowProfileService();

    const user = await showProfile.execute({ userId });

    user.password = '';

    return response.json(user);
  }
}