import UsersDao from '../daos/guests.dao';
import {CRUD} from "../../common/interfaces/crud.interface";
import {GuestsDto} from "../dto/guests.dto";

class GuestsService implements CRUD {

    async create(resource: GuestsDto) {
        return UsersDao.addUser(resource);
    }

    async deleteById(resourceId: string) {
        return UsersDao.removeUserById(resourceId);
    };

    async list(limit: number, page: number) {
        return UsersDao.getUsers();
    };

    async patchById(resource: GuestsDto) {
        return UsersDao.patchUserById(resource)
    };

    async readById(resourceId: string) {
        return UsersDao.getUserByUserID(resourceId);
    };

    async updateById(resource: GuestsDto) {
        return UsersDao.putUserById(resource);
    };
}

export default new GuestsService();