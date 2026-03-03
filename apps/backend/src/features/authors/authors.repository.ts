import { Injectable } from '@nestjs/common';
import { Author, Prisma } from '@prisma/client';

import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class AuthorsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Author[]> {
    return await this.prisma.author.findMany({ include: { posts: true } });
  }

  async findById(id: number): Promise<Author | null> {
    return await this.prisma.author.findUnique({ where: { id }, include: { posts: true } });
  }

  async create(data: Prisma.AuthorCreateInput): Promise<Author> {
    return await this.prisma.author.create({ data });
  }

  async update(id: number, data: Prisma.AuthorUpdateInput): Promise<Author> {
    return await this.prisma.author.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Author> {
    return await this.prisma.author.delete({ where: { id } });
  }
}
