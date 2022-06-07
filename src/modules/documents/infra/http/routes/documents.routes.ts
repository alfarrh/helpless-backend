import { Request, request, Response, response, Router } from 'express';
import ensureAuthenticathed from '@modules/users/infra/middlewares/ensureAuthenticathed';

import DocumentsController from '../../controllers/DocumentsController';

const documentRouter = Router();
documentRouter.use(ensureAuthenticathed);

const documentsController = new DocumentsController();

documentRouter.get('/', documentsController.index);
documentRouter.post('/', documentsController.create);

export default documentRouter;
