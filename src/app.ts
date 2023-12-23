import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/midleware/golobalErrorHandler';
import notFoundHandler from './app/midleware/notfound';
import router from './app/routes';
const app: Application = express();

// parser
app.use(cookieParser());
app.use(express.json());
app.use(cors({origin: ['http://localhost:5173']}));

// application routes

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler)

// not Found
app.use(notFoundHandler)

export default app;
