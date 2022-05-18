import { UpdateUserAvatarDTO } from './dto/UpdateUserAvatarDTO';
import { User } from '@prisma/client';
import { prisma } from '../../prisma/client';
import uploadConfig from '../../config/upload';
import path from 'path';
import fs from 'fs';
import AppError from '../../errors/AppError';

class UpdateUserAvatar {
  async execute({
    userId,
    avatarFilename,
  }: UpdateUserAvatarDTO): Promise<User> {
    //verificar se existe usuario
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }
    //Deletar avatar anterior
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: user.avatar,
      },
    });
    return user;
  }
}

export default UpdateUserAvatar;
