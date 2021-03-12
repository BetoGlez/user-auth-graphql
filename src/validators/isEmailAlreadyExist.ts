import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserModel } from "../graphql/entities/User";

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    public async validate(email: string): Promise<boolean> {
        const existingUser = await UserModel.findOne({email});
        return !!!existingUser;
    }
}

export const IsEmailAlreadyExist = (validationOpts?: ValidationOptions) => {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOpts,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint
        });
    };
}