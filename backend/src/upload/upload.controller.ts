import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadService } from './upload.service';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('medical-document')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedicalDocument(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: '.(pdf|jpg|jpeg|png)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Request() req,
  ) {
    const fileUrl = await this.uploadService.uploadFile(
      file,
      req.user.userId,
      'medical-documents'
    );
    
    return { url: fileUrl };
  }
} 