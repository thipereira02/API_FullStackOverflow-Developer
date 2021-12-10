import * as questionsRepository from '../repositories/questionsRepository';
import { questionSchema } from '../schemas/QuestionSchema';

export async function createQuestion(question: string, student: string, userClass: string, tags: string) {
    const isValid = questionSchema.validate({ question, student, userClass, tags });
    if (isValid.error !== undefined) return false;

    const questionId = await questionsRepository.newQuestion(question, student, userClass, tags);
    return {
        id: questionId
    }
}

export async function getQuestions() {
    const questions = await questionsRepository.getUnansweredQuestions();
    if (!questions) return false;
    return questions;
}
