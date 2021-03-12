import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

import { IsEmailAlreadyExist } from "../../../../validators/isEmailAlreadyExist";

@InputType()
export class RegisterInput {
    @Field()
    @Length(1, 255)
    public name: string;

    @Field()
    @IsEmail({}, { message: "invalidEmail" })
    @IsEmailAlreadyExist({ message: "alreadyExistsEmail" })
    public email: string;

    @Field()
    public password: string;
}