import { SaveDocumentDTO } from '../dtos/SaveDocumentDTO';
import { Document } from '@prisma/client';
import { prisma } from '@shared/infra/db/prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

@injectable()
class SaveDocumentService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}
  async execute({
    documentId,
    documentFilename,
  }: SaveDocumentDTO): Promise<Document> {
    //verificar se existe usuario
    const document = await prisma.document.findUnique({
      where: { id: documentId },
    });
    if (!document) {
      throw new AppError('Document does not exist.');
    }
    //Deletar doc anterior

    if (document?.doc) {
      await this.storageProvider.deleteFile(document.doc);
    }

    const filename = await this.storageProvider.saveFile(documentFilename);

    document.doc = filename;

    await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        doc: document.doc,
      },
    });
    return document;
  }
}

export default SaveDocumentService;
