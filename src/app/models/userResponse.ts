import { User } from "./user";

export class UserResponse{
    data!: Array<User>;
    message!: string;
    statusCode!: number;
}