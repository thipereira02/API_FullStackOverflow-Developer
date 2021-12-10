import { Response, Request } from 'express';

import QuestionInterface from '../interfaces/questionInterface';
import * as questionsService from '../services/questionsService';

export async function newQuestion(req: Request, res: Response) {
    try {
        const { question, student, userClass, tags } = req.body as QuestionInterface;

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