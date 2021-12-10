import express from 'express';
import cors from 'cors';

import * as usersController from './controllers/usersController';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/users', usersController.newUser);

export default app;
