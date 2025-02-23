import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MedicalLog } from './schemas/medical-log.schema';
import { CreateLogDto } from './dto/create-log.dto';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class MedicalLogService {
  constructor(
    @InjectModel('MedicalLog') private readonly medicalLogModel: Model<MedicalLog>,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async create(userId: string, createLogDto: CreateLogDto): Promise<MedicalLog> {
    const createdLog = new this.medicalLogModel({
      ...createLogDto,
      userId: new Types.ObjectId(userId)
    });
    
    const savedLog = await createdLog.save();
    
    // Emit real-time update
    await this.eventsGateway.emitToUser(
      userId,
      'medicalLogCreated',
      savedLog
    );
    
    return savedLog;
  }

  async findAllByUser(userId: string): Promise<MedicalLog[]> {
    return this.medicalLogModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ date: -1 })
      .exec();
  }

  async findOne(id: string, userId: string): Promise<MedicalLog> {
    const log = await this.medicalLogModel.findOne({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId)
    });

    if (!log) {
      throw new NotFoundException('Medical log not found');
    }

    return log;
  }
} 