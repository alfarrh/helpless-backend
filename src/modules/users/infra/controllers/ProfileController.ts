import { Request, Response } from 'express';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async read(request: Request, response: Response): Promise<Response> {
    const userId = String(request.query.id);

    const showProfile = new ShowProfileService();

    const user = await showProfile.execute({ userId });

    user.user.password = '';

    return response.json(user);
  }
}
