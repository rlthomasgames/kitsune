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
const log = (0, debug_1.default)('app:users-controller');
class UsersMiddleware {
    constructor() {
        // Here we need to use an arrow function to bind `this` correctly
        this.validatePatchEmail = async (req, res, next) => {
            if (req.body.email) {
                log('Validating email', req.body.email);
                this.validateSameEmailBelongToSameUser(req, res, next);
            }
            else {
                next();
            }
        };
    }
    async validateEmailFormat(req, res, next) {
        if (req.body && req.body.email && EmailValidator.validate(req.body.email)) {
            next();
        }
        else {
            res.status(400).send({ error: `invalid email format` });
        }
    }
    async validateRequiredUserBodyFields(req, res, next) {
        console.log('checking..', req, req.body);
        if (req.body && req.body.email && req.body.password) {
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
        const user = await users_service_1.default.getUserByEmail(req.body.email);
        if (user && user._id === req.params.userId) {
            next();
        }
        else {
            res.status(400).send({ error: `Invalid email` });
        }
    }
    async validateUserExists(req, res, next) {
        const user = await users_service_1.default.readById(req.params.userId);
        if (user) {
            next();
        }
        else {
            res.status(404).send({ error: `User ${req.params.userId} not found` });
        }
    }
    async extractUserId(req, res, next) {
        req.body._id = req.params.userId;
        next();
    }
}
exports.default = new UsersMiddleware();
