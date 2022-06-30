import { Router } from 'express';
import ensureAuthenticathed from '@modules/users/infra/middlewares/ensureAuthenticathed';
import { container } from 'tsyringe';
import uploadConfig from '@config/upload';
import multer from 'multer';
import UpdateDocumentController from '../../controllers/UpdateDocumentController';
import DocumentsController from '../../controllers/DocumentsController';

const documentRouter = Router();
const upload = multer(uploadConfig);
const documentsController = new DocumentsController();
const updateDocumentsController = container.resolve(UpdateDocumentController);

documentRouter.use(ensureAuthenticathed);

documentRouter.get('/', documentsController.index);
documentRouter.post('/', documentsController.create);
documentRouter.patch(
  '/file',
  upload.single('document'),
  updateDocumentsController.update,
);

export default documentRouter;
