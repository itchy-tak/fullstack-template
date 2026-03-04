import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';

import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Post[]> {
    return await this.prisma.post.findMany({ include: { author: true } });
  }

  async findById(id: number): Promise<Post | null> {
    return await this.prisma.post.findUnique({ where: { id }, include: { author: true } });
  }

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return await this.prisma.post.create({ data, include: { author: true } });
  }

  async update(id: number, data: Prisma.PostUpdateInput): Promise<Post> {
    return await this.prisma.post.update({ where: { id }, data, include: { author: true } });
  }

  async delete(id: number): Promise<Post> {
    return await this.prisma.post.delete({ where: { id } });
  }
}
