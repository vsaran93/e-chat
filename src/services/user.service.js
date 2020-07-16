const status = require("http-status");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');

const User = require("../models/user.model");
const RefreshToken = require('../models/refreshToken.model');

const logger = require("../../config/logger");

const { secret, expireInterval } = require('../../config/vars');

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
      const result = await user.save();
      const token = this.generateToken(result);
      const refreshToken = this.generateRefreshToken(result);
      await refreshToken.save();
      return { auth: true, token, refreshToken: refreshToken.token };
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
          const token = this.generateToken(registeredUser);
          const refreshToken = this.generateRefreshToken(result);
          await refreshToken.save();
          return {
            auth: true,
            msg: "successfully loggedIn!",
            token,
            refreshToken: refreshToken.token
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
  async generateRefreshToken(user) {
    return new RefreshToken({
      userId: user._id,
      token: this.randomTokenString(),
      expires: this.tokenExpireDate(),
    })
  }
  generateToken (user) {
    return jwt.sign({ user }, secret, { expiresIn: expireInterval  })
  }
  randomTokenString () {
    return crypto.randomBytes(40).toString('hex');
  }
  tokenExpireDate () {
    const currentDate = new Date();
    return moment(currentDate).add(2, 'hours');
  }
}

const userService = new UserService();
module.exports = userService;
