import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatar from '@modules/users/services/UpdateUserAvatar';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatar);

    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file?.filename!,
    });

    user.password = '';

    return response.json(user);
  }
}
