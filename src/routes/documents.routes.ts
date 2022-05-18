import { Request, request, Response, response, Router } from 'express';
import CreateDocumentService from '../services/document/CreateDocumentService';
import ensureAuthenticathed from '../middlewares/ensureAuthenticathed';
import { prisma } from '../prisma/client';

const documentRouter = Router();
documentRouter.use(ensureAuthenticathed);

documentRouter.get('/', async (request: Request, response: Response) => {
  const userId = request.user.id;
  const documentsList = await prisma.document.findMany({
    where: { userId },
  });
  return response.json(documentsList);
});

documentRouter.post('/', async (request, response) => {
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
});

export default documentRouter;
