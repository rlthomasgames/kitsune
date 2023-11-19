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
const mongodb = __importStar(require("mongodb"));
const shortid = require("shortid");
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:in-memory-dao');
/**
 * NEVER USER THIS CLASS IN REAL LIFE.
 * This class was created to ease the explanation of other topics in the corresponding article.
 * For any real-life scenario, consider using an ODM/ORM to manage your own database in a better way.
 */
class UsersDao {
    constructor() {
        this.users = [{
                email: "rlthomasgames@gmail.com",
                _id: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                firstName: "rhys",
                lastName: "thomas",
                password: "password53cur3",
                permissionLevel: 0
            }];
        this.mongoClient = new mongodb.MongoClient('mongodb://127.0.0.1:27017', { directConnection: true, serverSelectionTimeoutMS: 10000 });
        log('Created new instance of UsersDao', this.mongoClient);
        const collection = this.connectToDB('userdb', 'user');
        collection.then((value) => {
            if (value) {
                this.userCollection = value;
                this.getSecretKey("0");
            }
        });
    }
    async getSecretKey(userID) {
        const userRec = await this.getUserByUserID(userID);
        console.log(`${userRec.email} has secret key : ${userRec.secretKey}`);
    }
    async connectToDB(dbName, collection = undefined) {
        return new Promise(async (resolve, reject) => {
            await this.mongoClient.connect();
            const db = new mongodb.Db(this.mongoClient, dbName);
            // console.log('connected to mongodb', dbName);
            let mongoCollection;
            if (collection != undefined) {
                mongoCollection = db.collection(collection);
                // console.log('accessed mongodb', db, mongoCollection);
                return resolve(mongoCollection);
            }
        });
    }
    async addUser(user) {
        user._id = shortid.generate();
        this.users.push(user);
        return user._id;
    }
    async getUsers() {
        return this.users;
    }
    async getUserByUserID(userId) {
        if (this.userCollection) {
            const foundUser = await this.userCollection.findOne({ userID: userId });
            console.log('user record :', foundUser);
            return foundUser;
        }
    }
    async putUserById(user) {
        const objIndex = this.users.findIndex((obj) => obj._id === user._id);
        this.users.splice(objIndex, 1, user);
        return `${user._id} updated via put`;
    }
    async patchUserById(user) {
        const objIndex = this.users.findIndex((obj) => obj._id === user._id);
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
    async removeUserById(userId) {
        const objIndex = this.users.findIndex((obj) => obj._id === userId);
        this.users.splice(objIndex, 1);
        return `${userId} removed`;
    }
    async getUserByEmail(email) {
        const objIndex = this.users.findIndex((obj) => obj.email === email);
        let currentUser = this.users[objIndex];
        if (currentUser) {
            return currentUser;
        }
        else {
            return null;
        }
    }
}
exports.default = new UsersDao();
