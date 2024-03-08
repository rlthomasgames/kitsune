export interface UserDto {
   _id: string;
   email: string;
   password: string;
   firstName?: string;
   lastName?: string;
   permissionLevel?: number;
   priveledges?: string;
   userID?: string;
   secretKey?:string;
   registrationKey?:string;
}