import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Post as PostEntity } from '@prisma/client';

import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOkResponse({ type: [PostResponseDto] })
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PostResponseDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: PostResponseDto })
  async create(@Body() dto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PostResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PostResponseDto })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postsService.remove(id);
  }
}
