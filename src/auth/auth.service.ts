/* eslint-disable prettier/prettier */

import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { Users } from "src/users/users.interface";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, user: any = null): Promise<any> {
    const userExists = await this.usersService.findOne(email);

    if (!userExists) {
      // throw new UnauthorizedException();
      this.registerUser(user);
    }

    return true;
  }

  async registerUser(user: any) {
    // console.log("registerUser -------------->", user);
    const newUser = {
      id: user?.googleId,
      firstName: user?.givenName,
      lastName: user?.familyName,
      address: "",
      country: "",
      state: "",
      city: "",
      email: user?.email,
      phone: "",
      avatar: user?.imageUrl,
      zip: "",
      password: "",
      createdBy: user?.email,
      createdOn: new Date(),
      updatedBy: user?.email,
      updatedOn: new Date(),
    };
    try {
      this.usersService.create(newUser);
    } catch (e) {
      // console.log("registerUser exception", e);
      throw new InternalServerErrorException();
    }
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      username: user.email,
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      access_token: this.jwtService.sign(
        { sub: user.id },
        { secret: jwtConstants.secret }
      ),
    };
  }

  async create(user: Users): Promise<string> {
    return await this.usersService.create(user);
  }

  async verify(headers: any): Promise<any> {
    try {
      const { authorization } = headers;
      const splitHeader = authorization.split(" ");
      if (splitHeader.length === 2) {
        const scheme = splitHeader[0];
        const token = splitHeader[1];
        if (/^Bearer$/i.test(scheme)) {
          this.jwtService.verify(token);
          const decode: any = this.jwtService.decode(token);
          console.log("decode token", decode);
          return decode;
        }
      }
    } catch (e) {
      // console.log("e-----------------", e);
      throw new InternalServerErrorException();
    }
  }
}
