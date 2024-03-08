"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
const debug_1 = __importDefault(require("debug"));
const EmailValidator = __importStar(require("email-validator"));
const shortid_1 = __importDefault(require("shortid"));
const argon2_1 = __importDefault(require("argon2"));
const log = (0, debug_1.default)('app:users-controller');
class UsersMiddleware {
    constructor() {
        // Here we need to use an arrow function to bind `this` correctly
        this.validatePatchEmail = async (req, res, next) => {
            if (await this.validateSameEmailBelongToSameUser(req, res, next) == true) {
                log('Validating email', req.body.email);
                next();
            }
            return false;
        };
    }
    async signInAsUser(email, password) {
        return;
    }
    async signInAsGuest(guestID) {
        return;
    }
    async validateEmailFormat(req, res, next) {
        console.log('validating email format', req.body.email);
        if (req.body != undefined && req.body.email != undefined && EmailValidator.validate(req.body.email)) {
            next();
        }
        else {
            res.status(400).send({ error: `invalid email format`, source: req.body.email });
        }
    }
    async registerNewUserKey(req, res, next) {
        req.body.registrationKey = await argon2_1.default.hash(Date.now() + shortid_1.default.generate());
        next();
    }
    async validateRequiredUserBodyFields(req, res, next) {
        console.log('checking..', req, req.body);
        if (req.body && req.body.email != undefined && req.body.password != undefined) {
            next();
        }
        else {
            res.status(400).send({ error: `Missing required fields email and password` });
        }
    }
    async validateSameEmailDoesntExist(req, res, next) {
        const user = await users_service_1.default.getUserByEmail(req.body.email);
        if (user) {
            res.status(400).send({ error: `User email already exists` });
        }
        else {
            next();
        }
    }
    async validateSameEmailBelongToSameUser(req, res, next) {
        const emailReq = await users_service_1.default.getUserByEmail(req.body.email);
        const IDReq = await users_service_1.default.readById(req.body.userID);
        if (emailReq.email == IDReq.email && IDReq.userID == emailReq.userID) {
            next();
            return true;
        }
        else {
            //res.status(404).send({error: `User ID and email mismatch`});
            return false;
        }
    }
    async validateUserExists(req, res, next) {
        const user = await users_service_1.default.readById(req.params.userId);
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
exports.default = new UsersMiddleware();
