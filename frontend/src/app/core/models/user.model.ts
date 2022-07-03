import { UserProfile } from "firebase/auth";

export interface User extends UserProfile {
    imageUrl : string,
    image : number,
    isStaff : boolean,
    allowWriteComments : boolean,
    allowChangeAvatar : boolean
}