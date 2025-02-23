import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LogType } from '../dto/create-log.dto';

@Schema({ timestamps: true })
export class MedicalLog extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, enum: LogType })
  type: LogType;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  description: string;

  @Prop()
  title?: string;

  @Prop({ type: Object })
  metadata?: Record<string, any>;
}

export const MedicalLogSchema = SchemaFactory.createForClass(MedicalLog); 