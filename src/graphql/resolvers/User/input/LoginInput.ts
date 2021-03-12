import { IsEmail, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
    @Field()
    @IsEmail({}, { message: "invalidMail"})
    public email: string;

    @Field()
    @MinLength(5)
    public password: string;
}