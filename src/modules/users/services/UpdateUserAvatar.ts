import { UpdateUserAvatarDTO } from '../dtos/UpdateUserAvatarDTO';
import { User } from '@prisma/client';
import { prisma } from '@shared/infra/db/prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

@injectable()
class UpdateUserAvatar {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}
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
      await this.storageProvider.deleteFile(user.avatar);
    }
    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

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
