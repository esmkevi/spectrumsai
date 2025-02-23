import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Patient extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  clinicalPresentation: string;

  @Prop([String])
  conditions: string[];

  @Prop({ type: Object })
  medicalHistory: {
    diagnoses: string[];
    medications: string[];
    procedures: string[];
  };
}

export const PatientSchema = SchemaFactory.createForClass(Patient); 