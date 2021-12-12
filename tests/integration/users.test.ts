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

describe('POST /users', () => {
  it('should answer with status 201 when user is created', async () => {
    const body = {
      name: "Vegata",
      userClass: "T3" 
    }
    const response = await agent.post('/users').send(body);
    expect(response.status).toEqual(201);
  });

  it('should answer with status 409 when user name is already used', async () => {
    const body = {
      name: "Vegata",
      userClass: "T3" 
    }
    await agent.post('/users').send(body);
    const response = await agent.post('/users').send(body);
    expect(response.status).toEqual(409);
  });

  it('should answer with status 400 when name is empty', async () => {
    const body = {
      name: "",
      userClass: "T3" 
    }
    await agent.post('/users').send(body);
    const response = await agent.post('/users').send(body);
    expect(response.status).toEqual(400);
  });

  it('should answer with status 400 when userClass is invalid', async () => {
    const body = {
      name: "Vegata",
      userClass: "T35" 
    }
    await agent.post('/users').send(body);
    const response = await agent.post('/users').send(body);
    expect(response.status).toEqual(400);
  });
});
