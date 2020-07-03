const status = require("http-status");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const logger = require("../../config/logger");

const saltRounds = 10;

class UserService {
  async register(args) {
    try {
      const registeredUser = await this.findUserByEmail(args.email);
      if (registeredUser) {
        return {
          responseCode: status.BAD_REQUEST,
          msg: "user already exist",
        };
      }
      const user = new User(args);
      user.password = await this.getHashedPassword(args.password);
      const response = await user.save();
      return { response };
    } catch (error) {
      logger.error("register error", error);
      return {
        responseCode: status.SERVICE_UNAVAILABLE,
      };
    }
  }
  async login(args) {
    try {
      const registeredUser = await this.findUserByEmail(args.email);
      if (registeredUser) {
        const match = await this.passwordCompare(
          args.password,
          registeredUser.password
        );
        if (match) {
          return {
            msg: "successfully loggedIn!",
          };
        }
        return { responseCode: status.BAD_REQUEST, msg: "incorrect password" };
      } else {
        return {
          responseCode: status.NOT_FOUND,
          msg: "user not found",
        };
      }
    } catch (error) {
      logger.error("register error", error);
      return {
        responseCode: status.SERVICE_UNAVAILABLE,
      };
    }
  }
  async getUsers() {
    return await User.find();
  }
  async getUserById(id) {
    return await User.findOne({ _id: id });
  }
  async findUserByEmail(email) {
    return await User.findOne({ email: email });
  }
  async deleteUser(id) {
    return await User.findByIdAndRemove(id);
  }
  async updateUserById(id, args) {
    return await User.findOneAndUpdate(
      { _id: id },
      {
        firstName: args.firstName,
        lastName: args.lastName,
        picture: args.picture,
      }
    );
  }
  async getHashedPassword(plainPassword) {
    return await new Promise(function (resolve, reject) {
      bcrypt.hash(plainPassword, saltRounds, function (error, hash) {
        if (error) {
          reject(error);
        }
        resolve(hash);
      });
    });
  }
  async passwordCompare(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

const userService = new UserService();
module.exports = userService;
