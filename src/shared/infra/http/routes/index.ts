import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import documentRouter from '@modules/documents/infra/http/routes/documents.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/documents', documentRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
