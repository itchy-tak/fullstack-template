import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({ include: { posts: true } });
  }

  async findById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id }, include: { posts: true } });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return await this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: number): Promise<User> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
