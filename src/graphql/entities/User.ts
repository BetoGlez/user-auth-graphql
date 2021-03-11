import { Field, ID, ObjectType, Root } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";

@ObjectType()
export class User {
    @Field(() => ID)
    public id: string;

    @Field()
    @prop({ required: true })
    public name: string;

    @Field()
    @prop({ required: true })
    public email: string;

    @Field()
    public nameInitials(@Root() parent: any): string {
        const initials = (parent as User).name.substr(0, 2).toUpperCase();
        return initials;
    }

    @prop({ required: true })
    public password: string;
}

export const UserModel = getModelForClass(User);
