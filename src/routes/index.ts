import { Router } from 'express';
import usersRouter from './user.routes';
import sessionsRouter from './sessions.routes';
import documentRouter from './documents.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/documents', documentRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
