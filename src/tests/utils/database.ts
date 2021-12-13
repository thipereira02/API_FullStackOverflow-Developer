/* eslint-disable import/no-extraneous-dependencies */
import supertest from 'supertest';
import connection from '../../database';
import app from '../../app';

export const agent = supertest(app);

export async function clearDatabase() {
  await connection.query('TRUNCATE TABLE questions, students, classes RESTART IDENTITY');
}

export async function closeConnection() {
  await connection.end();
}
