import express from 'express';
import userService from '../services/users.service';
import debug from 'debug';
import * as EmailValidator from 'email-validator';
import shortid from "shortid";
import {UserDto} from "../dto/user.dto";
import argon2 from "argon2";

const log: debug.IDebugger = debug('app:users-controller');
class UsersMiddleware {

    async signInAsUser(email:string, password:string) {
        return;
    }

    async signInAsGuest(guestID:string) {
        return;
    }

    async validateEmailFormat(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log('validating email format', req.body.email);
        if (req.body != undefined && req.body.email != undefined && EmailValidator.validate(req.body.email)) {
            next();
        } else {
            res.status(400).send({error: `invalid email format`, source:req.body.email});
        }
    }

    async registerNewUserKey(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.registrationKey = await argon2.hash(Date.now()+shortid.generate());
        next();
    }

    async validateRequiredUserBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log('checking..', req, req.body)
        if (req.body && req.body.email != undefined && req.body.password != undefined) {
            next();
        } else {
            res.status(400).send({error: `Missing required fields email and password`});
        }
    }

    async validateSameEmailDoesntExist(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await userService.getUserByEmail(req.body.email);
        if (user) {
            res.status(400).send({error: `User email already exists`});
        } else {
            next();
        }
    }

    async validateSameEmailBelongToSameUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        const emailReq = await userService.getUserByEmail(req.body.email);
        const IDReq = await userService.readById(req.body.userID);
        if(emailReq.email == IDReq.email && IDReq.userID == emailReq.userID) {
            next();
            return true
        } else {
            //res.status(404).send({error: `User ID and email mismatch`});
            return false;
        }
    }

    // Here we need to use an arrow function to bind `this` correctly
    validatePatchEmail = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (await this.validateSameEmailBelongToSameUser(req, res, next) == true) {
            log('Validating email', req.body.email);
            next();
        }
        return false;
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

export default new UsersMiddleware();