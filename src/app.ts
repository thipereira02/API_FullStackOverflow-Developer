import express from 'express';
import cors from 'cors';

import * as usersController from './controllers/usersController';
import * as questionsController from './controllers/questionsController';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/questions', questionsController.newQuestion);
app.post('/users', usersController.newUser);

export default app;
