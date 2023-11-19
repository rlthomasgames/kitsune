import * as mongodb from "mongodb";
import shortid = require('shortid');
import {UserDto} from "../dto/user.dto";
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

/**
 * NEVER USER THIS CLASS IN REAL LIFE.
 * This class was created to ease the explanation of other topics in the corresponding article.
 * For any real-life scenario, consider using an ODM/ORM to manage your own database in a better way.
 */
class UsersDao {

    private mongoClient: mongodb.MongoClient;

    private userCollection: mongodb.Collection<UserDto>;

    users: Array<UserDto> = [{
        email: "rlthomasgames@gmail.com",
        _id: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        firstName: "rhys",
        lastName: "thomas",
        password: "password53cur3",
        permissionLevel: 0
    }];

    constructor() {
        this.mongoClient = new mongodb.MongoClient('mongodb://127.0.0.1:27017', {directConnection:true, serverSelectionTimeoutMS:10000});
        log('Created new instance of UsersDao', this.mongoClient);
        const collection = this.connectToDB('userdb', 'user');
        collection.then((value)=>{
            if(value) {
                this.userCollection = value as mongodb.Collection<UserDto>;
                this.getSecretKey("0")
            }
        })
    }

    async getSecretKey(userID:string){
        const userRec = await this.getUserByUserID(userID);
        console.log(`${userRec.email} has secret key : ${userRec.secretKey}`)
    }

    async connectToDB(dbName:string, collection:string | undefined = undefined):Promise<void | mongodb.Collection<UserDto>> {
        return new Promise<void | mongodb.Collection<UserDto>>(async (resolve, reject)=>{
            await this.mongoClient.connect();
            const db = new mongodb.Db(this.mongoClient, dbName);
            // console.log('connected to mongodb', dbName);
            let mongoCollection: mongodb.Collection<UserDto>;
            if(collection != undefined) {
                mongoCollection = db.collection(collection);
                // console.log('accessed mongodb', db, mongoCollection);
                return resolve(mongoCollection);
            }
        })
    }

    async addUser(user: UserDto) {
        user._id = shortid.generate();
        this.users.push(user);
        return user._id;
    }

    async getUsers() {
        return this.users;
    }

    async getUserByUserID(userId: string) {
        if(this.userCollection) {
            const foundUser = await this.userCollection.findOne({userID:userId});
            console.log('user record :', foundUser)
            return foundUser;
        }
    }

    async putUserById(user: UserDto) {
        const objIndex = this.users.findIndex((obj: { _id: string; }) => obj._id === user._id);
        this.users.splice(objIndex, 1, user);
        return `${user._id} updated via put`;
    }

    async patchUserById(user: UserDto) {
        const objIndex = this.users.findIndex((obj: { _id: string; }) => obj._id === user._id);
        let currentUser = this.users[objIndex];
        const allowedPatchFields = ["password", "firstName", "lastName", "permissionLevel"];
        for (let field of allowedPatchFields) {
            if (field in user) {
                // @ts-ignore
                currentUser[field] = user[field];
            }
        }
        this.users.splice(objIndex, 1, currentUser);
        return `${user._id} patched`;
    }


    async removeUserById(userId: string) {
        const objIndex = this.users.findIndex((obj: { _id: string; }) => obj._id === userId);
        this.users.splice(objIndex, 1);
        return `${userId} removed`;
    }

    async getUserByEmail(email: string) {
        const objIndex = this.users.findIndex((obj: { email: string; }) => obj.email === email);
        let currentUser = this.users[objIndex];
        if (currentUser) {
            return currentUser;
        } else {
            return null;
        }
    }
}

export default new UsersDao();