import { Response, Request } from 'express';

import * as questionsService from '../services/questionsService';
import NewQuestionInterface from '../interfaces/newQuestionInterface';
import AnswerQuestionInterface from '../interfaces/answerQuestionInterface';

export async function newQuestion(req: Request, res: Response) {
    try {
        const { question, student, userClass, tags } = req.body as NewQuestionInterface;

        const addNewQuestion = await questionsService.createQuestion(question, student, userClass, tags);
        if (!addNewQuestion) return res.sendStatus(400);

        return res.send(addNewQuestion);
        
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getUnansweredQuestions(req: Request, res: Response) {
    try {
        const questions = await questionsService.getQuestions();
        if (!questions) return res.sendStatus(404);

        return res.send(questions);

    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function answerQuestion(req: Request, res: Response) {
    try {
        const { answer } = req.body as AnswerQuestionInterface;
        const questionId = Number(req.params.id);
        const authorization = req.header("Authorization");
		const token = authorization?.replace("Bearer ", "");

        const answerQuestion = await questionsService.answerAQuestion(answer, questionId, token);
        if (answerQuestion === false) return res.sendStatus(404);
        if (answerQuestion === null) return res.sendStatus(400);

        return res.sendStatus(201);

    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getQuestionById(req: Request, res: Response) {
    try {
        const questionId = Number(req.params.id);

        const question = await questionsService.getQuestionById(questionId);
        if (!question) return res.sendStatus(404);

        return res.send(question);

    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}
