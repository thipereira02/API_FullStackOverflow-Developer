/* eslint-disable no-undef */
import '../../setup';

import { insertClass, insertQuestion, insertStudent } from '../factories/questionsFactory';
import { agent, clearDatabase, closeConnection } from '../utils/database';

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeConnection();
});

describe('POST /questions', () => {
  it('should answer with status 400 when question is empty', async () => {
    const body = {
      question: '',
      student: 'Vegata',
      userClass: 'T3',
      tags: 'typescript, vida, javascript, java?',
    };
    const response = await agent.post('/questions').send(body);
    expect(response.status).toEqual(400);
  });

  it('should answer with status 400 when student is empty', async () => {
    const body = {
      question: 'Uki ta contecendo?',
      student: '',
      userClass: 'T3',
      tags: 'typescript, vida, javascript, java?',
    };
    const response = await agent.post('/questions').send(body);
    expect(response.status).toEqual(400);
  });

  it('should answer with status 400 when userClass is empty', async () => {
    const body = {
      question: 'Uki ta contecendo?',
      student: 'Vegata',
      userClass: '',
      tags: 'typescript, vida, javascript, java?',
    };
    const response = await agent.post('/questions').send(body);
    expect(response.status).toEqual(400);
  });

  it('should answer with status 400 when tags is empty', async () => {
    const body = {
      question: 'Uki ta contecendo?',
      student: 'Vegata',
      userClass: 'T3',
      tags: '',
    };
    const response = await agent.post('/questions').send(body);
    expect(response.status).toEqual(400);
  });

  it('should answer with status 400 when userClass is invalid', async () => {
    const body = {
      question: 'Uki ta contecendo?',
      student: 'Vegata',
      userClass: 'T33',
      tags: 'typescript, vida, javascript, java?',
    };
    const response = await agent.post('/questions').send(body);
    expect(response.status).toEqual(400);
  });
});

describe('GET /questions', () => {
  it('should answer with status 404 when there is no unanswered questions to get', async () => {
    const response = await agent.get('/questions');
    expect(response.status).toEqual(404);
  });

  it('should answer with status 200 and when there is no unanswered questions to get', async () => {
    await insertQuestion();

    const response = await agent.get('/questions');
    expect(response.status).toEqual(200);
  });
});

describe('POST /questions/:id', () => {
  it('should answer with status 201 when the answer is posted', async () => {
    const body = {
      answer: 'Ok',
    };
    const { questionId, classId } = await insertQuestion();

    const { token } = await insertStudent(classId);

    const response = await agent.post(`/questions/${questionId}`).send(body).set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(201);
  });

  it('should answer with status 404 when the question doesnt exists', async () => {
    const body = {
      answer: 'Ok',
    };
    const { classId } = await insertClass();

    const { token } = await insertStudent(classId);

    const response = await agent.post('/questions/0').send(body).set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(404);
  });

  it('should answer with status 400 when the answer is empty', async () => {
    const body = {
      answer: '',
    };
    const { questionId, classId } = await insertQuestion();

    const { token } = await insertStudent(classId);

    const response = await agent.post(`/questions/${questionId}`).send(body).set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(400);
  });
});

describe('GET /questions/:id', () => {
  it('should answer with status 200 when question is returned', async () => {
    const { questionId, classId } = await insertQuestion();

    const { token } = await insertStudent(classId);

    const response = await agent.get(`/questions/${questionId}`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });

  it('should answer with status 404 when there is not question to return', async () => {
    const { classId } = await insertClass();

    const { token } = await insertStudent(classId);

    const response = await agent.get('/questions/1').set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(404);
  });
});
