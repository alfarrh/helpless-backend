import { User } from '@prisma/client';
import { RequestDTO } from '../dtos/RequestDTO';
import { prisma } from '@shared/infra/db/prisma/client';
import AppError from '@shared/errors/AppError';

interface GroupPoints {
  'Grupo 1': number;
  'Grupo 2': number;
  'Grupo 3': number;
}

export default class ShowProfileService {
  public async execute({
    userId,
  }: RequestDTO): Promise<{ user: User; groupPoints: GroupPoints }> {
    //verificar se existe usuario
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new AppError('O usuário não existe.');
    }

    //pontos
    const group1Points = await prisma.document.findMany({
      where: { userId, group: 'Grupo 1' },
    });
    const group2Points = await prisma.document.findMany({
      where: { userId, group: 'Grupo 2' },
    });
    const group3Points = await prisma.document.findMany({
      where: { userId, group: 'Grupo 3' },
    });

    var p1 = 0,
      p2 = 0,
      p3 = 0;

    for (var i = 0; i < group1Points.length; i++) {
      p1 = p1 + group1Points[i].points;
    }
    for (var i = 0; i < group2Points.length; i++) {
      p2 = p2 + group2Points[i].points;
    }
    for (var i = 0; i < group3Points.length; i++) {
      p3 = p3 + group3Points[i].points;
    }
    if (p1 > 30) p1 = 30;
    if (p2 > 30) p2 = 30;
    if (p3 > 40) p3 = 40;

    const groupPoints = { 'Grupo 1': p1, 'Grupo 2': p2, 'Grupo 3': p3 };
    console.log(groupPoints);

    return { user, groupPoints };
  }
}
