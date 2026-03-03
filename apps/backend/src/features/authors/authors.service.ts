import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from '@prisma/client';

import { AuthorsRepository } from './authors.repository';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  async findAll(): Promise<Author[]> {
    return this.authorsRepository.findAll();
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorsRepository.findById(id);
    if (!author) {
      throw new NotFoundException(`Author with id ${id.toString()} not found`);
    }
    return author;
  }

  async create(dto: CreateAuthorDto): Promise<Author> {
    return this.authorsRepository.create(dto);
  }

  async update(id: number, dto: UpdateAuthorDto): Promise<Author> {
    await this.findOne(id);
    return this.authorsRepository.update(id, dto);
  }

  async remove(id: number): Promise<Author> {
    await this.findOne(id);
    return this.authorsRepository.delete(id);
  }
}
