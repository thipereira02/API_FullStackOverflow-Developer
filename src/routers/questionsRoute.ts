import express from 'express';

import * as questionsController from '../controllers/questionsController';

const router = express.Router();

router.post('/questions', questionsController.newQuestion);
router.get('/questions', questionsController.getUnansweredQuestions);
router.post('/questions/:id', questionsController.answerQuestion);
router.get('/questions/:id', questionsController.getQuestionById);

export default router;
