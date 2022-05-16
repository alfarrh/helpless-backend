import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

const port = Number(process.env.PORT ?? 3333);
app.listen(port, '0.0.0.0', () => {
  console.log('😎👌 Serverzin on family. [URL] https://localhost:' + port);
});
