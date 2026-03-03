import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthorsRepository } from './authors.repository';
import { AuthorsService } from './authors.service';

const mockAuthorsRepository = () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('AuthorsService', () => {
  let service: AuthorsService;
  let repository: ReturnType<typeof mockAuthorsRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        { provide: AuthorsRepository, useFactory: mockAuthorsRepository },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    repository = module.get(AuthorsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      const authors = [
        { id: 1, name: 'Alice', posts: [] },
        { id: 2, name: 'Bob', posts: [] },
      ];
      repository.findAll.mockResolvedValue(authors);

      const result = await service.findAll();
      expect(result).toEqual(authors);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return an author when found', async () => {
      const author = { id: 1, name: 'Alice', posts: [] };
      repository.findById.mockResolvedValue(author);

      const result = await service.findOne(1);
      expect(result).toEqual(author);
      expect(repository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when author not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return an author', async () => {
      const dto = { name: 'Alice' };
      const created = { id: 1, name: 'Alice', posts: [] };
      repository.create.mockResolvedValue(created);

      const result = await service.create(dto);
      expect(result).toEqual(created);
      expect(repository.create).toHaveBeenCalledWith(dto);
    });
  });
});
