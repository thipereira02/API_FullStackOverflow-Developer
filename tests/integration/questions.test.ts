import '../../src/setup';
import supertest from 'supertest';
import app from '../../src/app';
import connection from '../../src/database';

beforeEach(async () => {
	await connection.query('TRUNCATE TABLE questions, students, classes RESTART IDENTITY');
});

afterAll(() => {
	connection.end();
});

const agent = supertest(app);

describe('POST /questions', () => {
    it('should answer with status 400 when question is empty', async () => {
      const body = {
        question: "",
        student: "Vegata",
        userClass: "T3",
        tags: "typescript, vida, javascript, java?"
      }
      const response = await agent.post('/questions').send(body);
      expect(response.status).toEqual(400);
    });

    it('should answer with status 400 when student is empty', async () => {
        const body = {
          question: "Uki ta contecendo?",
          student: "",
          userClass: "T3",
          tags: "typescript, vida, javascript, java?"
        }
        const response = await agent.post('/questions').send(body);
        expect(response.status).toEqual(400);
    });

    it('should answer with status 400 when userClass is empty', async () => {
        const body = {
          question: "Uki ta contecendo?",
          student: "Vegata",
          userClass: "",
          tags: "typescript, vida, javascript, java?"
        }
        const response = await agent.post('/questions').send(body);
        expect(response.status).toEqual(400);
    });

    it('should answer with status 400 when tags is empty', async () => {
        const body = {
          question: "Uki ta contecendo?",
          student: "Vegata",
          userClass: "T3",
          tags: ""
        }
        const response = await agent.post('/questions').send(body);
        expect(response.status).toEqual(400);
    });

    it('should answer with status 400 when userClass is invalid', async () => {
        const body = {
          question: "Uki ta contecendo?",
          student: "Vegata",
          userClass: "T33",
          tags: "typescript, vida, javascript, java?"
        }
        const response = await agent.post('/questions').send(body);
        expect(response.status).toEqual(400);
    });
});