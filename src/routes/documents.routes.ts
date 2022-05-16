import { request, response, Router } from 'express';
import CreateDocumentService from '../services/document/CreateDocumentService/CreateDocumentService';
import ensureAuthenticathed from '../middlewares/ensureAuthenticathed';
import { prisma } from '../prisma/client';

const documentRouter = Router();
documentRouter.use(ensureAuthenticathed);

documentRouter.get('/', async (request, response) => {
  try {
    const documentsList = await prisma.document.findMany();
    return response.json(documentsList);
  } catch (err) {
    return response.status(400).json({ error: err });
  }
});

documentRouter.post('/', async (request, response) => {
  try {
    const { userId, title, group, hours, description } = request.body;

    const createDocument = new CreateDocumentService();
    const user = await createDocument.execute({
      userId,
      title,
      group,
      hours,
      description,
    });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err });
  }
});

export default documentRouter;
