"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
const argon2_1 = __importDefault(require("argon2"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:users-controller');
class UsersController {
    async listUsers(req, res) {
        const users = await users_service_1.default.list(100, 0);
        res.status(200).send(users);
    }
    async getUserById(req, res) {
        const user = await users_service_1.default.readById(req.params.userId);
        res.status(200).send(user);
    }
    async createUser(req, res) {
        req.body.password = await argon2_1.default.hash(req.body.password);
        const userId = await users_service_1.default.create(req.body);
        res.status(201).send({ id: userId });
    }
    async patch(req, res) {
        if (req.body.password) {
            req.body.password = await argon2_1.default.hash(req.body.password);
        }
        log(await users_service_1.default.patchById(req.body));
        res.status(204).send(``);
    }
    async put(req, res) {
        req.body.password = await argon2_1.default.hash(req.body.password);
        log(await users_service_1.default.updateById(Object.assign({ id: req.params.userId }, req.body)));
        res.status(204).send(``);
    }
    async removeUser(req, res) {
        log(await users_service_1.default.deleteById(req.params.userId));
        res.status(204).send(``);
    }
}
exports.default = new UsersController();
