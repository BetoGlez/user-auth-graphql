import { getModelForClass,  } from "@typegoose/typegoose";
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import * as bcrypt from "bcryptjs";

import { User } from "../../entities/User";

@Resolver(User)
export class UserResolvers {

    private UserModel = getModelForClass(User);

    @FieldResolver()
    public async nameInitials(@Root() parent: any): Promise<string> {
        const initials = (parent as User).name.substr(0, 2).toUpperCase();
        return initials;
    }

    @Query(() => User, { nullable: true })
    public async getUser(
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
