import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Author } from '@prisma/client';

import { AuthorsService } from './authors.service';
import { AuthorResponseDto } from './dto/author-response.dto';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @ApiOkResponse({ type: [AuthorResponseDto] })
  async findAll(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: AuthorResponseDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.authorsService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: AuthorResponseDto })
  async create(@Body() dto: CreateAuthorDto): Promise<Author> {
    return this.authorsService.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: AuthorResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: AuthorResponseDto })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.authorsService.remove(id);
  }
}
