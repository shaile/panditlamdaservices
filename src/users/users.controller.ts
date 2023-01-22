/* eslint-disable prettier/prettier */
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "aws-sdk/clients/appstream";
import { AuthService } from "src/auth/auth.service";
import { GoogleOauthGuard } from "src/auth/google-oauth.guard";
import { Users } from "./users.interface";
import { UsersService } from "./users.service";

@Controller("users")
@UseGuards(GoogleOauthGuard)
// @UseGuards(AuthGuard("google"))
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  // @Post('avatar')
  // @UseInterceptors(FileInterceptor('file'))
  // async upload(@UploadedFile() file, @Headers() headers: any) {
  //   const { sub } = await this.authService.verify(headers);
  //   return await this.usersService.upload(file, sub);
  // }

  // @Get('avatar')
  // async getAvatar(@Headers() headers: any): Promise<any> {
  //   // const { sub } = await this.authService.verify(headers);
  //   const file = await this.usersService.getAvatar(sub);
  //   return file;
  // }

  @Get()
  async getAll(): Promise<Users[]> {
    return await this.usersService.getAll();
  }

  // @Get(":id")
  // async getUser(@Param() params: any, @Headers() headers: any): Promise<User> {
  //   let pid = params.id;
  //   if (pid === "loginUser") {
  //     const { sub } = await this.authService.verify(headers);
  //     pid = sub;
  //   }
  //   return await this.usersService.get(pid);
  // }

  @Delete(":id")
  async deleteTodo(@Param() params: any): Promise<any> {
    return await this.usersService.delete(params.id);
  }

  // @Post()
  // async create(@Body() user: Users): Promise<any> {
  //   console.log("users create body", user);
  //   return await this.authService.create(user);
  // }
}
