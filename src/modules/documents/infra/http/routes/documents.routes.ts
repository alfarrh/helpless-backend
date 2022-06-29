import { Router } from 'express';
import ensureAuthenticathed from '@modules/users/infra/middlewares/ensureAuthenticathed';
import { container } from 'tsyringe';
import uploadConfig from '@config/upload';
import multer from 'multer';

import DocumentsController from '../../controllers/DocumentsController';

const documentRouter = Router();
documentRouter.use(ensureAuthenticathed);
const upload = multer(uploadConfig);

const documentsController = container.resolve(DocumentsController);

documentRouter.get('/', documentsController.index);
documentRouter.post('/', documentsController.create);
documentRouter.patch(
  '/',
  ensureAuthenticathed,
  upload.single('document'),
  documentsController.update,
);

export default documentRouter;
