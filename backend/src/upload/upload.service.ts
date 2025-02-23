import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private s3: S3;

  constructor(private configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    userId: string,
    type: string
  ): Promise<string> {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = `${userId}/${type}/${uuidv4()}.${fileExtension}`;

      const uploadResult = await this.s3
        .upload({
          Bucket: this.configService.get('AWS_S3_BUCKET'),
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'private',
        })
        .promise();

      return uploadResult.Location;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async getSignedUrl(key: string): Promise<string> {
    return this.s3.getSignedUrlPromise('getObject', {
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: key,
      Expires: 3600, // URL expires in 1 hour
    });
  }
} 