import { IsString, IsDate, IsOptional, IsEnum } from 'class-validator';

export enum LogType {
  MOOD = 'Mood',
  DIET = 'Diet',
  THERAPY = 'Therapy Session',
  MILESTONE = 'Milestone',
  EVENT = 'Event',
}

export class CreateLogDto {
  @IsEnum(LogType)
  type: LogType;

  @IsDate()
  date: Date;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  title?: string;
} 