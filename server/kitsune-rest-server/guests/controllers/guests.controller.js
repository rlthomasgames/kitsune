"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const guests_service_1 = __importDefault(require("../services/guests.service"));
const argon2_1 = __importDefault(require("argon2"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:users-controller');
class GuestsController {
    async listUsers(req, res) {
        console.log('creating register key');
        const users = await guests_service_1.default.list(100, 0);
        res.status(200).send(users);
    }
    async getUserById(req, res) {
        const user = await guests_service_1.default.readById(req.params.userId);
        res.status(200).send(user);
    }
    async createUser(req, res) {
        req.body.password = await argon2_1.default.hash(req.body.password);
        const createdUser = await guests_service_1.default.create(req.body);
        if (createdUser != null) {
            res.status(201).send(createdUser);
        }
        else {
            res.status(400).send({ error: 'create user failed' });
        }
    }
    async patch(req, res) {
        if (req.body.password) {
            req.body.password = await argon2_1.default.hash(req.body.password);
        }
        log(await guests_service_1.default.patchById(req.body));
        res.status(204).send(``);
    }
    async put(req, res) {
        req.body.password = await argon2_1.default.hash(req.body.password);
        log(await guests_service_1.default.updateById(Object.assign({ id: req.params.userId }, req.body)));
        res.status(204).send(``);
    }
    async removeUser(req, res) {
        log(await guests_service_1.default.deleteById(req.params.userId));
        res.status(204).send(``);
    }
}
exports.default = new GuestsController();
