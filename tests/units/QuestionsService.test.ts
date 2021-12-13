/* eslint-disable no-undef */
import faker from 'faker';

import * as questionsService from '../../src/services/questionsService';
import * as questionsRepository from '../../src/repositories/questionsRepository';

describe('Questions Service', () => {
  it('Should return id when question is created', async () => {
    const question = faker.random.words();
    const student = faker.name.firstName();
    const userClass = 'T1';
    const tags = faker.random.word();

    jest.spyOn(questionsRepository, 'newQuestion').mockImplementationOnce(async () => 1);

    const result = await questionsService.createQuestion(question, student, userClass, tags);
    expect(result).toBeTruthy();
  });

  it('Should return falsy when question is empty', async () => {
    const question = '';
    const student = faker.name.firstName();
    const userClass = 'T1';
    const tags = faker.random.word();

    jest.spyOn(questionsRepository, 'newQuestion').mockImplementationOnce(async () => 1);

    const result = await questionsService.createQuestion(question, student, userClass, tags);
    expect(result).toBeFalsy();
  });

  it('Should return falsy when student is empty', async () => {
    const question = faker.random.words();
    const student = '';
    const userClass = 'T1';
    const tags = faker.random.word();

    jest.spyOn(questionsRepository, 'newQuestion').mockImplementationOnce(async () => 1);

    const result = await questionsService.createQuestion(question, student, userClass, tags);
    expect(result).toBeFalsy();
  });

  it('Should return falsy when userClass is empty', async () => {
    const question = faker.random.words();
    const student = faker.name.firstName();
    const userClass = '';
    const tags = faker.random.word();

    jest.spyOn(questionsRepository, 'newQuestion').mockImplementationOnce(async () => 1);

    const result = await questionsService.createQuestion(question, student, userClass, tags);
    expect(result).toBeFalsy();
  });

  it('Should return falsy when userClass is invalid', async () => {
    const question = faker.random.words();
    const student = faker.name.firstName();
    const userClass = 'T44';
    const tags = faker.random.word();

    jest.spyOn(questionsRepository, 'newQuestion').mockImplementationOnce(async () => 1);

    const result = await questionsService.createQuestion(question, student, userClass, tags);
    expect(result).toBeFalsy();
  });

  it('Should return falsy when tags is empty', async () => {
    const question = faker.random.words();
    const student = faker.name.firstName();
    const userClass = 'T44';
    const tags = '';

    jest.spyOn(questionsRepository, 'newQuestion').mockImplementationOnce(async () => 1);

    const result = await questionsService.createQuestion(question, student, userClass, tags);
    expect(result).toBeFalsy();
  });

  it('Should return falsy when there is no unanswered questions to get', async () => {
    jest.spyOn(questionsRepository, 'getUnansweredQuestions').mockImplementationOnce(async () => false);

    const result = await questionsService.getQuestions();
    expect(result).toBeFalsy();
  });

  it('Should return falsy when unanswered questions are returned', async () => {
    jest.spyOn(questionsRepository, 'getUnansweredQuestions').mockImplementationOnce(async () => []);

    const result = await questionsService.getQuestions();
    expect(result).toBeTruthy();
  });

  it('Should return true when a question is answered', async () => {
    const answer = faker.random.words();
    const questionId = Number(faker.datatype.number());
    const token = faker.datatype.uuid();

    jest.spyOn(questionsRepository, 'checkQuestionId').mockImplementationOnce(async () => true);
    jest.spyOn(questionsRepository, 'answerQuestion').mockImplementationOnce(async () => true);

    const result = await questionsService.answerAQuestion(answer, questionId, token);
    expect(result).toBe(true);
  });

  it('Should return false when an invalid questionId is passed', async () => {
    const answer = faker.random.words();
    const questionId = 0;
    const token = faker.datatype.uuid();

    jest.spyOn(questionsRepository, 'checkQuestionId').mockImplementationOnce(async () => false);
    jest.spyOn(questionsRepository, 'answerQuestion').mockImplementationOnce(async () => true);

    const result = await questionsService.answerAQuestion(answer, questionId, token);
    expect(result).toBe(false);
  });

  it('Should return falsy when answer is empty', async () => {
    const answer = '';
    const questionId = Number(faker.datatype.number());
    const token = faker.datatype.uuid();

    jest.spyOn(questionsRepository, 'checkQuestionId').mockImplementationOnce(async () => true);
    jest.spyOn(questionsRepository, 'answerQuestion').mockImplementationOnce(async () => false);

    const result = await questionsService.answerAQuestion(answer, questionId, token);
    expect(result).toBeFalsy();
  });
});
