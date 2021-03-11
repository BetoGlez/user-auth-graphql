import { getModelForClass,  } from "@typegoose/typegoose";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entities/User";

@Resolver()
export class UserResolvers {

    private UserModel = getModelForClass(User);

    @Query(() => User, { nullable: true })
    public async getUserByName(
        @Arg("name") name: string
    ): Promise<User | null> {
        const foundUser = await this.UserModel.findOne({name});
        return foundUser;
    }

    @Query(() => [User])
    public async getUsers(): Promise<Array<User>> {
        const users = await this.UserModel.find();
        return users;
    }

    @Mutation(() => User)
    public async register(
        @Arg("name") name: string,
        @Arg("email") email: string,
        @Arg("password") password: string
    ): Promise<User> {
        const encryptedPwd = await bcrypt.hash(password, 12);
        const newUser = { name, email, password: encryptedPwd } as User;
        const newUserResult = await this.UserModel.create(newUser);
        return newUserResult;
    }
}
