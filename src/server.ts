import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });

      console.error(err);

      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  },
);

const port = Number(process.env.PORT ?? 3333);
app.listen(port, '0.0.0.0', () => {
  console.log('😎👌 Serverzin on family. [URL] https://localhost:' + port);
});
