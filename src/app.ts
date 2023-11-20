import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

const a = 10;

app.get('/', (req: Request, res: Response) => {
  res.send(a);
});

export default app;
