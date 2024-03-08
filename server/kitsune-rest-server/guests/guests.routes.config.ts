import {CommonRoutesConfig} from '../common/common.routes.config';
import UsersController from './controllers/guests.controller';
import UsersMiddleware from './middleware/guests.middleware';
import express from 'express';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes() {
        this.app.route(`/users`)
            .get(UsersController.listUsers)
            .post(
                UsersMiddleware.registerNewUserKey,
                UsersController.createUser);

        this.app.param(`userId`, UsersMiddleware.extractUserId);
        this.app.route(`/users/:userId`)
            .all(UsersMiddleware.validateUserExists)
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser);

        this.app.put(`/users/:userId`,[
            UsersController.put
        ]);

        this.app.patch(`/users/:userId`, [
            UsersController.patch
        ]);

        return this.app;
    }
}