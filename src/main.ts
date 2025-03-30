import 'module-alias/register';
import routes from '@infrastructure/routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';

const app = express();

// Middleware para parsear JSON en el body de las solicitudes
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Usar las rutas de usuario
app.use(routes);

// Definir una ruta básica
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello, Clean Architecture with TypeScript!');
});

// Configurar el puerto en el que se ejecutará el servidor
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3100;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});