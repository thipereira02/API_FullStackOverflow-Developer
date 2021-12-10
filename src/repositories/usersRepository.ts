import "../setup";
import connection from "../database";

export async function checkName(name: string):Promise<boolean> {
    const check = await connection.query(`
        SELECT *
        FROM students
        WHERE name=$1
    `, [name]);
    if (check.rowCount === 0) return true;
    return false;
}

export async function createUser(name: string, userClass: string, token: string):Promise<string> {
    let classId;

    const classAlreadyRegistered = await connection.query(`
        SELECT *
        FROM classes
        WHERE name=$1
    `, [userClass]);

    if (classAlreadyRegistered.rowCount === 0) {
        const result = await connection.query(`
            INSERT INTO classes
            (name)
            VALUES ($1)
            RETURNING id
        `, [userClass]);
        classId = result.rows[0].id;
    } else {
        classId = classAlreadyRegistered.rows[0].id;
    }

    const userToken = await connection.query(`
        INSERT INTO students
        (name, "classId", token)
        VALUES ($1, $2, $3)
        RETURNING token
    `, [name, classId, token]);
    return userToken.rows[0].token;
}