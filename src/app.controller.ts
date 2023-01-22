/* eslint-disable prettier/prettier */
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { Users } from "./users/users.interface";

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  /**
   * Uses guards
   * @param req
   * @returns
   */
  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  /**
   * Posts app controller
   * @param user
   * @returns create
   */
  @Post()
  async create(@Body() user: Users): Promise<any> {
    return await this.authService.create(user);
  }

  @Get("auth/glogin")
  async googleAuth() {
    return "Update new Build 16";
  }

  // @Get("google/redirect")
  // @UseGuards(AuthGuard("google"))
  // async googleAuthRedirect(@Req() req) {
  //   return await this.authService.googleLogin(req);
  // }
}
