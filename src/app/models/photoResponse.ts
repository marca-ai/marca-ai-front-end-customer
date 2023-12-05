import { ProfilePicture } from "./profilePicture";

export class PhotoResponse{
    data!: Array<ProfilePicture>;
    message!: string;
    statusCode!: number;
}