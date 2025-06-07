import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

const mockUsersRepository = () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let repository: ReturnType<typeof mockUsersRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: UsersRepository, useFactory: mockUsersRepository }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: 1, email: 'alice@example.com', name: 'Alice' },
        { id: 2, email: 'bob@example.com', name: 'Bob' },
      ];
      repository.findAll.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a user when found', async () => {
      const user = { id: 1, email: 'alice@example.com', name: 'Alice' };
      repository.findById.mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(result).toEqual(user);
      expect(repository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when user not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a user', async () => {
      const dto = { email: 'alice@example.com', name: 'Alice' };
      const created = { id: 1, ...dto };
      repository.create.mockResolvedValue(created);

      const result = await service.create(dto);
      expect(result).toEqual(created);
      expect(repository.create).toHaveBeenCalledWith(dto);
    });
  });
});
