import bcrypt from "bcrypt";
import _ from "lodash";
import { map } from "modern-async";
import moment from "moment";
import { seedData } from "./data";
import { User } from "./entities/User";

export const seedDb = async () => {
  await map(seedData, async (item) => {
    try {
      const newUser = new User();
      newUser.custId = item.id;
      newUser.username = item.first_name + " " + item.last_name;
      newUser.mobile = item.mobile;
      newUser.email = _.toLower(item.email);
      newUser.age = item.age;
      newUser.registerDate = moment(item.register_date).toISOString();
      newUser.isForLogin = false;
      newUser.isActive = true;
      newUser.hash = await bcrypt.hash(item.password, 12);
      await newUser.save();
    } catch (err) {}
  });
};
