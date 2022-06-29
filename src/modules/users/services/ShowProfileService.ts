import { User } from '@prisma/client';
import { RequestDTO } from '../dtos/RequestDTO';
import { prisma } from '@shared/infra/db/prisma/client';
import AppError from '@shared/errors/AppError';

export default class ShowProfileService {
  public async execute({ userId }: RequestDTO): Promise<User> {
    //verificar se existe usuario
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new AppError('O usuário não existe.');
    }

    //pontos
    const groupPoints = await prisma.document.groupBy({
      by: ['group'],
      _sum: {
        points: true,
      },
    });

    console.log(groupPoints);

    return user;
  }
}
