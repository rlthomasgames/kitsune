import * as mongodb from "mongodb";
import {GuestsDto} from "../dto/guests.dto";
import debug from 'debug';
import argon2 from "argon2";

const log: debug.IDebugger = debug('app:in-memory-dao');

/**
 * NEVER USER THIS CLASS IN REAL LIFE.
 * This class was created to ease the explanation of other topics in the corresponding article.
 * For any real-life scenario, consider using an ODM/ORM to manage your own database in a better way.
 */
class GuestsDao {

    private mongoClient: mongodb.MongoClient;

    private guestCollection: mongodb.Collection<GuestsDto>;

    users: Array<GuestsDto> = [{
        _id: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        permissionLevel: -1
    }];

    constructor() {
        this.mongoClient = new mongodb.MongoClient('mongodb://127.0.0.1:27017', {directConnection:true, serverSelectionTimeoutMS:10000});
        log('Created new instance of UsersDao', this.mongoClient);
        const collection = this.connectToDB('userdb', 'user');
        collection.then((value)=>{
            if(value) {
                this.guestCollection = value as mongodb.Collection<GuestsDto>;
                const secret = this.getSecretKey("0");
                console.log(`${secret} - secret key`)
            }
        })
    }

    async getSecretKey(userID:string){
        const userRec = await this.getUserByUserID(userID);
        if(userRec) {
            console.log(`${userRec.userID} has secret key : ${userRec.secretKey}`)
            return userRec.secretKey;
        }
    }

    async connectToDB(dbName:string, collection:string | undefined = undefined):Promise<void | mongodb.Collection<GuestsDto>> {
        return new Promise<void | mongodb.Collection<GuestsDto>>(async (resolve, reject)=>{
            await this.mongoClient.connect();
            const db = new mongodb.Db(this.mongoClient, dbName);
            // console.log('connected to mongodb', dbName);
            let mongoCollection: mongodb.Collection<GuestsDto>;
            if(collection != undefined) {
                mongoCollection = db.collection(collection);
                // console.log('accessed mongodb', db, mongoCollection);
                return resolve(mongoCollection);
            }
        })
    }

    async addUser(user: GuestsDto) {
        console.log('adding user');
        const sessionKey = 'guestSession';
        const userID = await argon2.hash(sessionKey) as string;
        console.log('unique user ID = ', userID, user);
        user.userID = userID;
        const created = await this.guestCollection.insertOne(user)
        return created ? user : null;
    }

    async getUsers() {
        if(this.guestCollection){
            return [ await this.guestCollection.findOne({userID:'0'}, { ignoreUndefined:false })];
        }
    }

    async getUserByUserID(userId: string) {
        if(this.guestCollection && userId != null) {
            return await this.guestCollection.findOne({userID:userId});
        }
    }

    async putUserById(user: GuestsDto) {
        const foundUser = await this.guestCollection.findOne({userID:user.userID});
        if(foundUser != undefined) {
            return `${user.userID} already exists`;
        } else {
            this.guestCollection.insertOne(user);
            return `${user.userID} created new user`;
        }
    }

    async patchUserById(user: GuestsDto) {
        let currentUser = await this.guestCollection.findOne({userID:user.userID});
        const allowedPatchFields = ["password", "firstName", "lastName", "permissionLevel"];
        const tempChanges = currentUser;
        for (let field of allowedPatchFields) {
            if (field in user) {
                // @ts-ignore
                tempChanges[field] = user[field];
            }
        }
        const result = await this.guestCollection.replaceOne({userID:user.userID}, tempChanges)
        return `${result} - successful update`;
    }

    async removeUserById(userId: string) {
        this.guestCollection.deleteOne({userID:userId})
        return `${userId} removed`;
    }

    async getUserByEmail(email: string) {
        let currentUser = await this.guestCollection.findOne({email:email});
        if (currentUser) {
            return currentUser;
        } else {
            return null;
        }
    }
}

export default new GuestsDao();