
import { Action } from "./action";
import { User } from "src/app/core/models/user.model";

export class Message{
    from?: User;
    content?: any;
    action?: Action;
}