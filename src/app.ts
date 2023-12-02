import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoute } from './app/modules/student/student.route';
import { userRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/midleware/golobalErrorHandler';
import notFoundHandler from './app/midleware/notfound';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes

app.use('/api/v1/students', studentRoute);
app.use('/api/v1/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler)

// not Found
app.use(notFoundHandler)

export default app;
