"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const guests_dao_1 = __importDefault(require("../daos/guests.dao"));
class GuestsService {
    async create(resource) {
        return guests_dao_1.default.addUser(resource);
    }
    async deleteById(resourceId) {
        return guests_dao_1.default.removeUserById(resourceId);
    }
    ;
    async list(limit, page) {
        return guests_dao_1.default.getUsers();
    }
    ;
    async patchById(resource) {
        return guests_dao_1.default.patchUserById(resource);
    }
    ;
    async readById(resourceId) {
        return guests_dao_1.default.getUserByUserID(resourceId);
    }
    ;
    async updateById(resource) {
        return guests_dao_1.default.putUserById(resource);
    }
    ;
}
exports.default = new GuestsService();
