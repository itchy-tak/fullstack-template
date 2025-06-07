import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '@prisma/client';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async findAll(): Promise<Post[]> {
    return this.postsRepository.findAll();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findById(id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id.toString()} not found`);
    }
    return post;
  }

  async create(dto: CreatePostDto): Promise<Post> {
    return this.postsRepository.create({
      title: dto.title,
      content: dto.content,
      published: dto.published,
      ...(dto.authorId !== undefined ? { author: { connect: { id: dto.authorId } } } : {}),
    });
  }

  async update(id: number, dto: UpdatePostDto): Promise<Post> {
    await this.findOne(id);
    return this.postsRepository.update(id, dto);
  }

  async remove(id: number): Promise<Post> {
    await this.findOne(id);
    return this.postsRepository.delete(id);
  }
}
