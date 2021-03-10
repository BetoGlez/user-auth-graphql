import { Field, ID, ObjectType } from "type-graphql";
import { prop } from "@typegoose/typegoose";


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

    @prop({ required: true })
    public password: string;
}