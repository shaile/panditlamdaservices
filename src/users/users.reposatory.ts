/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import dynamoDB from "src/db";
import { Users } from "./users.interface";

@Injectable()
export class UserRepository {
  /**
   * Gets all
   * @returns all
   */
  async getAll(): Promise<Users[]> {
    try {
      return dynamoDB
        .scan({
          TableName: "UserTable",
        })
        .promise();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * Creates user repository
   * @param user
   * @returns create
   */
  async create(user: Users): Promise<string> {
    console.log("registerUser --------------> newUser", user);
    const blogObj = {
      id: uuid(),
      ...user,
    };
    try {
      return await dynamoDB
        .put(
          {
            TableName: "UserTable",
            Item: user,
          },
          (err: any, data: any) => {
            if (err) {
              console.log("UserRepository create", err); // an error occurred
            } else {
              console.log("UserRepository uccessful response", data); // successful response
            }
          }
        )
        .promise();
    } catch (e) {
      console.log("UserRepository InternalServerErrorException", e);
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * Finds user repository
   * @param email
   * @returns User
   */
  async find(email: string): Promise<Users> {
    try {
      const params = {
        TableName: "UserTable",
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: {
          ":email": email,
        },
      };
      const user = await dynamoDB.query(params).promise();
      return user && user.Items.length > 0 ? user.Items[0] : "";
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * Gets user repository
   * @param ID
   * @returns get
   */
  async get(ID: string): Promise<Users> {
    try {
      const user = await dynamoDB
        .scan({
          TableName: "UserTable",
          FilterExpression: "#ID = :ID",
          ExpressionAttributeNames: {
            "#ID": "id",
          },
          ExpressionAttributeValues: {
            ":ID": ID,
          },
        })
        .promise();
      return user && user.Items.length > 0 ? user.Items[0] : "";
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * Deletes user repository
   * @param id
   * @returns delete
   */
  async delete(id: string): Promise<any> {
    try {
      return await dynamoDB
        .delete({
          TableName: "UserTable",
          Key: { id },
        })
        .promise();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
