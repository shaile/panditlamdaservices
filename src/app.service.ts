/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import dynamoDB from "./db";

@Injectable()
export class AppService {
  googleLogin(req) {
    if (!req.user) {
      return "No user from google";
    }

    return {
      message: "User information from google",
      user: req.user,
    };
  }

  getHello(): string {
    return "Hello World!";
  }

  async getBlogs(): Promise<any> {
    try {
      return dynamoDB
        .scan({
          TableName: "BlogsTable",
        })
        .promise();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async createBlog(blog: any): Promise<any> {
    const blogObj = {
      id: uuid(),
      ...blog,
    };

    console.log("**********", blogObj);
    try {
      return await dynamoDB
        .put(
          {
            TableName: "BlogsTable",
            Item: blogObj,
          },
          (err: any, data: any) => {
            if (err) {
              console.log(err); // an error occurred
            } else {
              console.log(data); // successful response
            }
          }
        )
        .promise();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
