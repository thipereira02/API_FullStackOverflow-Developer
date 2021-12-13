import express from 'express';

import * as usersController from '../controllers/usersController';

const router = express.Router();

router.post('/users', usersController.newUser);

export default router;
