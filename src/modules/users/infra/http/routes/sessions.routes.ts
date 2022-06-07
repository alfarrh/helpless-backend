import { request, response, Router } from 'express';
import { container } from 'tsyringe';
import SessionsController from '../../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = container.resolve(SessionsController);

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
