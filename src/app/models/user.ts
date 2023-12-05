import { ProfilePicture } from "./profilePicture";

export class User {
    
    id!: string;
    name!: string;
    profilePicture!: ProfilePicture;
    email!: string;
    phoneNumber!: string;
    cep!: string;
    birthday!: Date;
    creationDate!: Date;
}