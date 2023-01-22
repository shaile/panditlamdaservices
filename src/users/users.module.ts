/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "src/auth/auth.service";
import { jwtConstants } from "src/auth/constants";
import { UsersController } from "./users.controller";
import { UserRepository } from "./users.reposatory";
import { UsersService } from "./users.service";

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, AuthService],
})
export class UsersModule {}
