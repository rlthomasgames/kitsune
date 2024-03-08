import * as mongodb from "mongodb";
import shortid = require('shortid');
import {UserDto} from "../dto/user.dto";
import debug from 'debug';
import argon2 from "argon2";

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
                const secret = this.getSecretKey("0");
                console.log(`${secret} - secret key`)
            }
        })
    }

    async getSecretKey(userID:string){
        const userRec = await this.getUserByUserID(userID);
        if(userRec) {
            console.log(`${userRec.email} has secret key : ${userRec.secretKey}`)
            return userRec.secretKey;
        }
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
        console.log('adding user');
        const userID = await argon2.hash(user.registrationKey+(Math.random()*66)) as string;
        console.log('unique user ID = ', userID, user);
        user.userID = userID;
        const created = await this.userCollection.insertOne(user)
        return created ? user : null;
    }

    async getUsers() {
        if(this.userCollection){
            return [ await this.userCollection.findOne({userID:'0'}, { ignoreUndefined:false })];
        }
    }

    async getUserByUserID(userId: string) {
        if(this.userCollection && userId != null) {
            return await this.userCollection.findOne({userID:userId});
        }
    }

    async putUserById(user: UserDto) {
        const foundUser = await this.userCollection.findOne({userID:user.userID});
        if(foundUser != undefined) {
            return `${user.userID} already exists`;
        } else {
            this.userCollection.insertOne(user);
            return `${user.userID} created new user`;
        }
    }

    async patchUserById(user: UserDto) {
        let currentUser = await this.userCollection.findOne({userID:user.userID});
        const allowedPatchFields = ["password", "firstName", "lastName", "permissionLevel"];
        const tempChanges = currentUser;
        for (let field of allowedPatchFields) {
            if (field in user) {
                // @ts-ignore
                tempChanges[field] = user[field];
            }
        }
        const result = await this.userCollection.replaceOne({userID:user.userID}, tempChanges)
        return `${result} - successful update`;
    }

    async removeUserById(userId: string) {
        this.userCollection.deleteOne({userID:userId})
        return `${userId} removed`;
    }

    async getUserByEmail(email: string) {
        let currentUser = await this.userCollection.findOne({email:email});
        if (currentUser) {
            return currentUser;
        } else {
            return null;
        }
    }
}

export default new UsersDao();