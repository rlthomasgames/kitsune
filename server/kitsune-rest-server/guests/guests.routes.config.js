"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const guests_controller_1 = __importDefault(require("./controllers/guests.controller"));
const guests_middleware_1 = __importDefault(require("./middleware/guests.middleware"));
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app.route(`/users`)
            .get(guests_controller_1.default.listUsers)
            .post(guests_middleware_1.default.registerNewUserKey, guests_controller_1.default.createUser);
        this.app.param(`userId`, guests_middleware_1.default.extractUserId);
        this.app.route(`/users/:userId`)
            .all(guests_middleware_1.default.validateUserExists)
            .get(guests_controller_1.default.getUserById)
            .delete(guests_controller_1.default.removeUser);
        this.app.put(`/users/:userId`, [
            guests_controller_1.default.put
        ]);
        this.app.patch(`/users/:userId`, [
            guests_controller_1.default.patch
        ]);
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
