"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_dao_1 = __importDefault(require("../daos/users.dao"));
class UsersService {
    async create(resource) {
        return users_dao_1.default.addUser(resource);
    }
    async deleteById(resourceId) {
        return users_dao_1.default.removeUserById(resourceId);
    }
    ;
    async list(limit, page) {
        return users_dao_1.default.getUsers();
    }
    ;
    async patchById(resource) {
        return users_dao_1.default.patchUserById(resource);
    }
    ;
    async readById(resourceId) {
        return users_dao_1.default.getUserByUserID(resourceId);
    }
    ;
    async updateById(resource) {
        return users_dao_1.default.putUserById(resource);
    }
    ;
    async getUserByEmail(email) {
        return users_dao_1.default.getUserByEmail(email);
    }
}
exports.default = new UsersService();
