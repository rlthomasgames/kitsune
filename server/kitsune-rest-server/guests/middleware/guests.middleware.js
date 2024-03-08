"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const guests_service_1 = __importDefault(require("../services/guests.service"));
const debug_1 = __importDefault(require("debug"));
const shortid_1 = __importDefault(require("shortid"));
const argon2_1 = __importDefault(require("argon2"));
const log = (0, debug_1.default)('app:users-controller');
class GuestsMiddleware {
    async signInAsUser(email, password) {
        return;
    }
    async signInAsGuest(guestID) {
        return;
    }
    async registerNewUserKey(req, res, next) {
        req.body.registrationKey = await argon2_1.default.hash(Date.now() + shortid_1.default.generate());
        next();
    }
    async validateUserExists(req, res, next) {
        const user = await guests_service_1.default.readById(req.params.userId);
        if (user) {
            res.status(200).send(user);
            next();
            return true;
        }
        else {
            res.status(404).send({ error: `User not found` });
            return false;
        }
    }
    async extractUserId(req, res, next) {
        req.body.userID = req.params.userId;
        next();
    }
}
exports.default = new GuestsMiddleware();
