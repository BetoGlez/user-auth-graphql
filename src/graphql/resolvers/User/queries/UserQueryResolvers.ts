import { Arg, Query, Resolver } from "type-graphql";

import { User, UserModel } from "../../../entities/User";

@Resolver()
export class UserQueryResolvers {

    @Query(() => User, { nullable: true })
    public async getUserByName(
        @Arg("name") name: string
    ): Promise<User | null> {
        const foundUser = await UserModel.findOne({name});
        return foundUser;
    }

    @Query(() => [User])
    public async getUsers(): Promise<Array<User>> {
        const users = await UserModel.find();
        return users;
    }
}
