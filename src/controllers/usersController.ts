import { Response, Request } from 'express';

import UserInterface from '../interfaces/userInterface';
import * as usersService from '../services/usersService';

export async function newUser(req: Request, res: Response) {
    try{
        const { name, userClass } = req.body as UserInterface;
        
        const createUser = await usersService.create(name, userClass);
        if (createUser === null) return res.sendStatus(409);
        if (createUser === false) return res.sendStatus(400);

        res.send(createUser).status(201);

    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}