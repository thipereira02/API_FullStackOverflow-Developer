import supertest from 'supertest';
import connection from '../../src/database';
import app from '../../src/app';

export const agent = supertest(app);

export async function clearDatabase() {
  await connection.query('TRUNCATE TABLE questions, students, classes RESTART IDENTITY');
}

export async function closeConnection() {
  await connection.end();
}
