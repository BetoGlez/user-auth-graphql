import { IsEmail, Length } from "class-validator";
import { IsEmailAlreadyExist } from "../../../../graphql/validators/isEmailAlreadyExist";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
    @Field()
    @Length(1, 255)
    name: string;

    @Field()
    @IsEmail({}, { message: "invalidEmail" })
    @IsEmailAlreadyExist({ message: "alreadyExistsEmail" })
    email: string;

    @Field()
    password: string;
}