import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SaveDocumentService from '@modules/documents/services/SaveDocumentService';

export default class UpdateDocumentController {
  public async update(request: Request, response: Response): Promise<Response> {
    var id = request.query.id;
    const updateDocument = container.resolve(SaveDocumentService);

    const document = await updateDocument.execute({
      documentId: String(id),
      documentFilename: request.file?.filename!,
    });

    return response.json(document);
  }
}
