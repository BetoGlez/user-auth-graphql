import { Arg, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";

import { User, UserModel } from "../../../entities/User";
import { RegisterInput } from "../input/RegisterInput";

@Resolver()
export class UserMutationResolvers {

    @Mutation(() => User)
    public async register(
        @Arg("registerInput") {email, name, password}: RegisterInput
    ): Promise<User> {
        const encryptedPwd = await bcrypt.hash(password, 12);
        const newUser = { name, email, password: encryptedPwd } as User;
        const newUserResult = await UserModel.create(newUser);
        return newUserResult;
    }
}
