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

describe('GET /questions', () => {
    it('should answer with status 404 when there is no unanswered questions to get', async () => {
        const response = await agent.get('/questions');
        expect(response.status).toEqual(404);
    });

    it('should answer with status 200 and when there is no unanswered questions to get', async () => {
        const newClass = await connection.query(`
            INSERT INTO classes
            (name)
            VALUES ('T3')
            RETURNING id
        `);
        await connection.query(`
            INSERT INTO questions
            (question, "classId", student, tags, "submitAt")
            VALUES ('Uki ta contecendo?', ${newClass.rows[0].id}, 'Vegata', 'typescript, vida, javascript, java?', '2021-12-12 19:56')
        `);
        const response = await agent.get('/questions');
        expect(response.status).toEqual(200);
    });
});