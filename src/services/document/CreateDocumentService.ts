import { Document } from '@prisma/client';
import { prisma } from '../../prisma/client';
import { CreateDocumentDTO } from './dtos/CreateDocumentDTO';
import AppError from '../../errors/AppError';

class CreateDocumentService {
  async execute({
    userId,
    title,
    group,
    hours,
    description,
  }: CreateDocumentDTO): Promise<Document> {
    //verificar se existe usuario
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new AppError('O usuário não existe.');
    }
    //criar o documento
    const document = await prisma.document.create({
      data: {
        userId: userId,
        title,
        group,
        hours,
        description,
      },
    });
    return document;
  }
}

export default CreateDocumentService;
