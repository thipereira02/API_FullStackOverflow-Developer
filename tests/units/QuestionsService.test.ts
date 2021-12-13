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
});
