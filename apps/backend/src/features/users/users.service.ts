import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id.toString()} not found`);
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(dto);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    await this.findOne(id);
    return this.usersRepository.update(id, dto);
  }

  async remove(id: number): Promise<User> {
    await this.findOne(id);
    return this.usersRepository.delete(id);
  }
}
