import express from 'express';
import userService from '../services/guests.service';
import debug from 'debug';
import * as EmailValidator from 'email-validator';
import shortid from "shortid";
import {GuestsDto} from "../dto/guests.dto";
import argon2 from "argon2";

const log: debug.IDebugger = debug('app:users-controller');
class GuestsMiddleware {

    async signInAsUser(email:string, password:string) {
        return;
    }

    async signInAsGuest(guestID:string) {
        return;
    }

    async registerNewUserKey(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.registrationKey = await argon2.hash(Date.now()+shortid.generate());
        next();
    }

    async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await userService.readById(req.params.userId);
        if (user) {
            res.status(200).send(user);
            next();
            return true;
        } else {
            res.status(404).send({error: `User not found`});
            return false;
        }
    }

    async extractUserId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.userID = req.params.userId;
        next();
    }
}

export default new GuestsMiddleware();