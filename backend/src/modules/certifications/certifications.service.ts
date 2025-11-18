import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Certification } from './schemas/certification.schema';
import { CreateCertificationDto, UpdateCertificationDto } from './dto/certification.dto';

@Injectable()
export class CertificationsService {
  constructor(
    @InjectModel(Certification.name) private certificationModel: Model<Certification>,
  ) {}

  async findAll(): Promise<Certification[]> {
    return this.certificationModel.find({ active: true }).sort({ order: 1, date: -1 }).exec();
  }

  async findOne(id: string): Promise<Certification> {
    const certification = await this.certificationModel.findById(id).exec();
    if (!certification) {
      throw new NotFoundException(`Certification with ID ${id} not found`);
    }
    return certification;
  }

  async findByIssuer(issuer: string): Promise<Certification[]> {
    return this.certificationModel.find({ issuer, active: true }).sort({ order: 1, date: -1 }).exec();
  }

  async create(createCertificationDto: CreateCertificationDto): Promise<Certification> {
    const certification = new this.certificationModel(createCertificationDto);
    return certification.save();
  }

  async update(id: string, updateCertificationDto: UpdateCertificationDto): Promise<Certification> {
    const certification = await this.certificationModel
      .findByIdAndUpdate(id, updateCertificationDto, { new: true })
      .exec();
    
    if (!certification) {
      throw new NotFoundException(`Certification with ID ${id} not found`);
    }
    return certification;
  }

  async remove(id: string): Promise<void> {
    const result = await this.certificationModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Certification with ID ${id} not found`);
    }
  }
}
