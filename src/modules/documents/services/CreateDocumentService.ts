import { Document } from '@prisma/client';
import { prisma } from '@shared/infra/db/prisma/client';
import { CreateDocumentDTO } from '../dtos/CreateDocumentDTO';
import AppError from '@shared/errors/AppError';
import CalculatePoints from './CalculatePoints';

class CreateDocumentService {
  async execute({
    userId,
    title,
    activity,
    group,
    points,
    hours,
    description,
  }: CreateDocumentDTO): Promise<Document> {
    //verificar se existe usuario
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new AppError('O usuário não existe.');
    }
    //calcular pontos
    const pointsCalculator = new CalculatePoints();

    points = await pointsCalculator.calculate({
      activity,
      group,
      hours,
    });

    if (!points) {
      throw new AppError('Dados de pontuação incorretos.');
    }
    //passar pro banco
    const document = await prisma.document.create({
      data: {
        userId: userId,
        title,
        group,
        points,
        hours,
        description,
      },
    });
    return document;
  }
}

export default CreateDocumentService;
