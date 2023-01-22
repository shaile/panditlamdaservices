/* eslint-disable prettier/prettier */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { google, Auth } from "googleapis";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class GoogleOauthGuard extends AuthGuard("google") {
  constructor(
    private readonly authService: AuthService // Do not use @Inject (or nest won't be able to inject it)
  ) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    // return validateRequest(request);
    // return super.canActivate(context);
    return await this.validateRequest(request);
  }

  async validateRequest(request: any) {
    try {
      const { authorization, user } = request.headers;
      const clientID = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_SECRET;
      const oauthClient: Auth.OAuth2Client = new google.auth.OAuth2(
        clientID,
        clientSecret
      );
      console.log("XXXXXXBXBXBXBXBXXB authorization", authorization);
      const bearer = authorization ? authorization.split(" ") : [1, 1];
      console.log("XXXXXXBXBXBXBXBXXB tokenInfo", request.headers);
      const token: any = bearer[1];
      const tokenInfo: any = await oauthClient.getTokenInfo(token);

      return this.authService.validateUser(tokenInfo?.email, JSON.parse(user));
    } catch {
      new UnauthorizedException();
    }
  }
}
