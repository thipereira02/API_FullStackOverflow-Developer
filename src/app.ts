import express from 'express';
import cors from 'cors';

import usersRoute from './routers/usersRoute';
import questionsRoute from './routers/questionsRoute';

const app = express();
app.use(cors());
app.use(express.json());

app.use(questionsRoute);
app.use(usersRoute);

export default app;
