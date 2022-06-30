import { DocumentIdDTO } from '../dtos/DocumentIdDTO';
import { prisma } from '@shared/infra/db/prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

@injectable()
class DeleteDocumentService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}
  async execute({ documentId }: DocumentIdDTO): Promise<string> {
    //verificar se existe usuario
    var doc = await prisma.document.findUnique({ where: { id: documentId } });

    if (!doc) {
      throw new AppError('O documento não existe.');
    }

    const documentFile = doc.doc;

    await prisma.document.delete({ where: { id: documentId } });

    doc = await prisma.document.findUnique({ where: { id: documentId } });

    if (doc) {
      throw new AppError('Falha em excluir o documento.');
    } else if (documentFile) {
      this.storageProvider.deleteFile(documentFile);
    } else {
      throw new AppError('Document deleted. No such file.');
    }

    return 'Document deleted.';
  }
}

export default DeleteDocumentService;
