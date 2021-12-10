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