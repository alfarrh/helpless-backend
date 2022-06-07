import { Document } from '@prisma/client';
import { prisma } from '@shared/infra/db/prisma/client';
import AppError from '@shared/errors/AppError';

class ShowDocumentsListService {
  async execute(userId: string): Promise<Document[]> {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new AppError('O usuário não existe.');
    }

    const documentsList = await prisma.document.findMany({
      where: { userId },
    });
    return documentsList;
  }
}
export default ShowDocumentsListService;
