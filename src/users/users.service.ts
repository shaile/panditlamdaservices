/* eslint-disable prettier/prettier */
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { Users } from "./users.interface";
import { UserRepository } from "./users.reposatory";

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async upload(file: any, id: string) {
    // const { originalname } = file;
    const fileName = `${id}.png`;
    const bucketS3 = "panditnestbucket";
    await this.uploadS3(file.buffer, bucketS3, fileName);
  }

  async uploadS3(file: any, bucket: string, name: string) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: "AKIAREHSVZTY57NLBFP6",
      secretAccessKey: "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",
    });
  }

  async getAll(): Promise<Users[]> {
    return await this.userRepository.getAll();
  }

  async create(user: Users): Promise<string> {
    return await this.userRepository.create(user);
  }

  async get(id: string): Promise<any> {
    const data = await this.userRepository.get(id);
    return data;
  }

  async delete(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }
  async findOne(email: string): Promise<Users | undefined> {
    return this.userRepository.find(email);
  }

  async getAvatar(id: string): Promise<any | undefined> {
    const s3 = new S3();
    const url = await s3.getSignedUrlPromise("getObject", {
      Bucket: "panditnestbucket",
      Key: `${id}.png`,
    });

    console.log("##################", url);
    return {
      avatar: `${id}.png`,
      url,
    };
  }
}
