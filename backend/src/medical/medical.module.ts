import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalLogController } from './medical-log.controller';
import { MedicalLogService } from './medical-log.service';
import { MedicalLogSchema } from './schemas/medical-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MedicalLog', schema: MedicalLogSchema }
    ])
  ],
  controllers: [MedicalLogController],
  providers: [MedicalLogService],
  exports: [MedicalLogService]
})
export class MedicalModule {} 