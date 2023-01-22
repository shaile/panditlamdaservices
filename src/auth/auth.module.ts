/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { UsersService } from "src/users/users.service";
import { UserRepository } from "src/users/users.reposatory";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "3600s" },
    }),
  ],
  providers: [AuthService, UsersService, UserRepository, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
