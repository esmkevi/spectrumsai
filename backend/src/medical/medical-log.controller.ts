import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request
} from '@nestjs/common';
import { MedicalLogService } from './medical-log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('medical-logs')
@UseGuards(JwtAuthGuard)
export class MedicalLogController {
  constructor(private readonly medicalLogService: MedicalLogService) {}

  @Post()
  async create(@Request() req, @Body() createLogDto: CreateLogDto) {
    return this.medicalLogService.create(req.user.userId, createLogDto);
  }

  @Get()
  async findAll(@Request() req) {
    return this.medicalLogService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    return this.medicalLogService.findOne(id, req.user.userId);
  }
} 