import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async findAll(category?: string, featured?: boolean): Promise<Project[]> {
    const filter: any = { active: true };
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (featured !== undefined) {
      filter.featured = featured;
    }

    return this.projectModel.find(filter).sort({ order: 1, createdAt: -1 }).exec();
  }

  async findAllForAdmin(): Promise<Project[]> {
    return this.projectModel.find().sort({ order: 1, createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = new this.projectModel(createProjectDto);
    return project.save();
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    // Whitelist of allowed update fields -- update as appropriate
    const allowedFields = ['title', 'description', 'category', 'featured', 'order', 'active']; // Add all valid fields from UpdateProjectDto
    const sanitizedUpdate: any = {};

    for (const key of Object.keys(updateProjectDto)) {
      if (key.startsWith('$')) {
        // Disallow MongoDB operators
        continue;
      }
      if (allowedFields.includes(key)) {
        sanitizedUpdate[key] = updateProjectDto[key];
      }
    }

    const project = await this.projectModel
      .findByIdAndUpdate(id, sanitizedUpdate, { new: true })
      .exec();

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async remove(id: string): Promise<void> {
    const result = await this.projectModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }

  async getStats(): Promise<{ total: number; byCategory: Record<string, number> }> {
    const projects = await this.projectModel.find({ active: true }).exec();
    const total = projects.length;
    
    const byCategory = projects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return { total, byCategory };
  }
}
