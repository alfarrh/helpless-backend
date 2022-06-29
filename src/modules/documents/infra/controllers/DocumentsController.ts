import { Request, Response } from 'express';
import CreateDocumentService from '@modules/documents/services/CreateDocumentService';
import ShowDocumentsListService from '@modules/documents/services/ShowDocumentsListService';
import SaveDocumentService from '@modules/documents/services/SaveDocumentService';
import { container } from 'tsyringe';

export default class DocumentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { userId, title, activity, group, points, hours, description } =
      request.body;

    const createDocument = new CreateDocumentService();

    const document = await createDocument.execute({
      userId,
      title,
      activity,
      group,
      points,
      hours,
      description,
    });

    return response.json(document);
  }
  public async index(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const showDocsList = new ShowDocumentsListService();

    const documentsList = await showDocsList.execute(userId);

    return response.json(documentsList);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateDocument = container.resolve(SaveDocumentService);

    const document = await updateDocument.execute({
      documentId: request.user.id,
      documentFilename: request.file?.filename!,
    });

    return response.json(document);
  }
}
