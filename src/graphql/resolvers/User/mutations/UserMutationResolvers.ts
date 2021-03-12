import { Arg, Mutation, Resolver } from "type-graphql";
import { UserInputError } from "apollo-server-errors";
import bcrypt from "bcryptjs";

import { User, UserModel } from "../../../entities/User";
import { RegisterInput } from "../input/RegisterInput";
import { LoginInput } from "../input/LoginInput";
import { generateToken } from "../../../../utils/tokens";
import { sendEmail } from "../../../../utils/sendEmail";

@Resolver()
export class UserMutationResolvers {

    @Mutation(() => User)
    public async register(
        @Arg("registerInput") {email, name, password}: RegisterInput
    ): Promise<User> {
        const encryptedPwd = await bcrypt.hash(password, 12);
        const newUser = { name, email, password: encryptedPwd } as User;
        const newUserResult = await UserModel.create(newUser);

        await sendEmail(newUserResult.email, newUserResult.name);

        return newUserResult;
    }

    @Mutation(() => User)
    public async login(
        @Arg("loginInput") {email, password}: LoginInput
    ): Promise<User> {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw new UserInputError("User not found", { error: "userNotFound" })
        }
        const pwdMatch = await bcrypt.compare(password, user.password);
        if (!pwdMatch) {
            throw new UserInputError("Invalid credentials", { error: "invalidCredentials" });
        }
        const token = generateToken(user);

        return {
            id: user._id,
            name: user.name,
            email: user.email,
            token
        } as User;
    }
}
