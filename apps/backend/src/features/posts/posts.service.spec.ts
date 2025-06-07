import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';

const mockPostsRepository = () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('PostsService', () => {
  let service: PostsService;
  let repository: ReturnType<typeof mockPostsRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService, { provide: PostsRepository, useFactory: mockPostsRepository }],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get(PostsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const posts = [
        { id: 1, title: 'Post 1', content: 'Content 1', published: true, authorId: 1 },
        { id: 2, title: 'Post 2', content: null, published: false, authorId: null },
      ];
      repository.findAll.mockResolvedValue(posts);

      const result = await service.findAll();
      expect(result).toEqual(posts);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a post when found', async () => {
      const post = {
        id: 1,
        title: 'Post 1',
        content: 'Content 1',
        published: true,
        authorId: 1,
      };
      repository.findById.mockResolvedValue(post);

      const result = await service.findOne(1);
      expect(result).toEqual(post);
      expect(repository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when post not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a post', async () => {
      const dto = { title: 'New Post', content: 'Content', published: false };
      const created = { id: 1, ...dto, authorId: null };
      repository.create.mockResolvedValue(created);

      const result = await service.create(dto);
      expect(result).toEqual(created);
      expect(repository.create).toHaveBeenCalledWith({
        title: dto.title,
        content: dto.content,
        published: dto.published,
      });
    });

    it('should create a post with authorId', async () => {
      const dto = { title: 'New Post', content: 'Content', published: true, authorId: 1 };
      const created = {
        id: 1,
        title: dto.title,
        content: dto.content,
        published: dto.published,
        authorId: 1,
      };
      repository.create.mockResolvedValue(created);

      const result = await service.create(dto);
      expect(result).toEqual(created);
      expect(repository.create).toHaveBeenCalledWith({
        title: dto.title,
        content: dto.content,
        published: dto.published,
        author: { connect: { id: 1 } },
      });
    });
  });
});
