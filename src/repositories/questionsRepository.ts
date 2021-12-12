import "../setup";
import connection from "../database";
import dayjs from 'dayjs'

export async function newQuestion(question: string, student: string, userClass: string, tags: string):Promise<number> {
    let classId;
    const now = dayjs().format('YYYY-MM-DD HH:mm');

    const classAlreadyRegistered = await connection.query(`
        SELECT *
        FROM classes
        WHERE name=$1
    `, [userClass]);

    if (classAlreadyRegistered.rowCount === 0){
        const result = await connection.query(`
            INSERT INTO classes
            (name)
            VALUES ($1)
            RETURNING id
        `, [userClass]);
        classId = result.rows[0].id;

    } else {
        const result = await connection.query(`
            SELECT id
            FROM classes
            WHERE name=$1
        `, [userClass]);
        classId = result.rows[0].id;
    }

    const questionId = await connection.query(`
        INSERT INTO questions
        (question, "classId", student, tags, "submitAt")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
    `, [question, classId, student, tags, now]);
    return questionId.rows[0].id;
}

export async function getUnansweredQuestions() {
    const result = await connection.query(`
        SELECT questions.id, questions.question, questions.student, questions."submitAt",
        classes.name AS class
        FROM questions
        JOIN classes
        ON questions."classId"=classes.id
        WHERE answered=false
    `);
    return result.rows;
}

export async function checkQuestionId(questionId: number):Promise<boolean> {
    const result = await connection.query(`
        SELECT *
        FROM questions
        WHERE id=$1
    `, [questionId]);
    if (result.rowCount === 0) return false;
    return true;
}

export async function answer(answer: string, questionId: number, token: string): Promise<boolean> {
    const whoAnswer = await connection.query(`
        SELECT *
        FROM students
        WHERE token=$1
    `, [token]);
    if (whoAnswer.rowCount === 0) return false;

    const answeredBy = whoAnswer.rows[0].id;
    const now = dayjs().format('YYYY-MM-DD HH:mm'); 

    await connection.query(`
        UPDATE questions
        SET answered=true, "answeredAt"=$1, "answeredBy"=$2, answer=$3
        WHERE id=$4
    `, [now, answeredBy, answer, questionId]);
    return true;
}

export async function getQuestion(questionId: number) {
    const answered = await connection.query(`
        SELECT questions.*,
        classes.name AS class,
        students.name AS "answeredBy"
        FROM questions
        JOIN classes
        ON questions."classId"=classes.id
        JOIN students
        ON questions."answeredBy"=students.id
        WHERE questions.id=$1
    `, [questionId]);
    if (answered.rowCount !== 0) return answered.rows[0];
    
    const unanswered = await connection.query(`
        SELECT questions.*, 
        classes.name AS class 
        FROM questions 
        JOIN classes 
        ON questions."classId"=classes.id 
        WHERE questions.id=$1 
        AND answered=false
    `, [questionId]);
    return unanswered.rows[0];
}
