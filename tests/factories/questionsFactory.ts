import connection from "../../src/database";
import faker from 'faker';

export async function insertStudent(classId: number) {
    const token = faker.datatype.uuid();
    await connection.query(`
        INSERT INTO students
        (name, "classId", token)
        VALUES ($1, $2, $3)
        RETURNING token
    `, ['Veegata', classId, token]);
    return { token }
}

export async function insertClass() {
    const newClass = await connection.query(`
        INSERT INTO classes
        (name)
        VALUES ('T3')
        RETURNING id
    `);
    return {classId: newClass.rows[0].id}
}

export async function insertQuestion() {
    const { classId } = await insertClass();
    const newQuestion = await connection.query(`
        INSERT INTO questions
        (question, "classId", student, tags, "submitAt")
        VALUES ('Uki ta contecendo?', ${classId}, 'Vegata', 'typescript, vida, javascript, java?', '2021-12-12 19:56')
        RETURNING id
    `);
    return {
        questionId: newQuestion.rows[0].id,
        classId
    }
}
