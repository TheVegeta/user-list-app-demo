import bcrypt from "bcrypt";
import _ from "lodash";
import moment from "moment";
import { nanoid } from "nanoid";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { User } from "../entities/User";
import { signJwt } from "../utils/jwt";

@InputType()
export class IUserAuthInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@ObjectType()
export class IAuthResponse {
  @Field()
  success!: boolean;

  @Field()
  msg!: string;

  @Field()
  jwt!: string;

  @Field()
  username!: string;
}

@InputType()
class ICreaeUser {
  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}

@Resolver()
export class AuthResolver {
  @Mutation(() => IAuthResponse)
  async userAtuh(
    @Arg("options") options: IUserAuthInput
  ): Promise<IAuthResponse> {
    try {
      const { email, password } = options;

      const user = await User.findOneOrFail({
        where: { email: _.toLower(email), isActive: true, isForLogin: true },
      });

      const isPasswordValid = await bcrypt.compare(password, user.hash);

      if (isPasswordValid) {
        return {
          success: true,
          msg: "Authenticated successfully",
          jwt: signJwt({ id: user.id }),
          username: user.username,
        };
      } else {
        throw Error("Auth Error");
      }
    } catch (err) {
      return {
        success: false,
        msg: "Auth Error",
        jwt: "",
        username: "",
      };
    }
  }

  @Mutation(() => IAuthResponse)
  async registerUser(
    @Arg("options") options: ICreaeUser
  ): Promise<IAuthResponse> {
    const { email, password, username } = options;

    const checkuser = await User.findOne({
      where: { email: _.toLower(email), isActive: true, isForLogin: true },
    });

    if (checkuser) {
      return {
        jwt: "",
        success: false,
        msg: "Email address alrady exist",
        username: "",
      };
    } else {
      const newUser = new User();
      newUser.custId = nanoid(8);
      newUser.username = username;
      newUser.mobile = "";
      newUser.email = _.toLower(email);
      newUser.age = _.toInteger(_.random(25, 80));
      newUser.registerDate = moment().toISOString();
      newUser.isForLogin = true;
      newUser.hash = await bcrypt.hash(password, 12);

      await newUser.save();

      return {
        jwt: signJwt({ id: newUser.id }),
        success: true,
        msg: "Authenticated successfully",
        username: newUser.username,
      };
    }
  }
}
