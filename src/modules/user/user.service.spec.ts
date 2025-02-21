import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import {
  testAccount1,
  testUser1,
  testUser2,
} from "../../common/constants/test.constants";
import User from "./user.entity";
import { UserRepository } from "./user.repository";
import { USER_REPOSITORY } from "../../common/constants/database.constants";
import { DatabaseModule } from "../database/database.module";
import { UserLoginDto, UserRegisterDto } from "./dto/user.dto";
import { databaseProvider } from "../database/database.providers";
import { EntityManager } from "typeorm";

describe("ScooterService", () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    repository = {
      getAllUsers: jest.fn().mockResolvedValue([
        { ...testUser1, id: 1 },
        { ...testUser2, id: 2 },
      ] as User[]),
      getUserById: jest.fn().mockResolvedValue({ ...testUser1, id: 1 } as User),
      getUserByAccount: jest
        .fn()
        .mockResolvedValue({ ...testUser1, id: 1 } as User),
      register: jest.fn().mockResolvedValue({ ...testUser1, id: 1 } as User),
      login: jest.fn().mockResolvedValue({ ...testUser1, id: 1 } as User),
    } as Partial<UserRepository> as jest.Mocked<UserRepository>;

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        {
          module: DatabaseModule,
          providers: [...databaseProvider],
          exports: [...databaseProvider],
        },
      ],
      // imports: [
      //   {
      //     module: DatabaseModule,
      //     providers: [
      //       {
      //         provide: DATA_SOURCE,
      //         useValue: {
      //           manager: {
      //             transaction: jest
      //               .fn()
      //               .mockImplementation(async (callback): Promise<any> => {
      //                 return await callback(repository);
      //               }),
      //           },
      //         },
      //       },
      //     ],
      //   },
      // ],
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe("getUserById", () => {
    it("should return user", async () => {
      const userId: number = 1;
      const result = await service.getUserById(userId);
      expect(repository.getUserById).toHaveBeenCalled();
      expect(repository.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toEqual({ ...testUser1, id: 1 });
    });
  });

  describe("getAllUsers", () => {
    it("should return users", async () => {
      const result = await service.getAllUsers();
      expect(repository.getAllUsers).toHaveBeenCalled();
      expect(result).toEqual([
        { ...testUser1, id: 1 },
        { ...testUser2, id: 2 },
      ]);
    });
  });

  describe("register", () => {
    it("should return user", async () => {
      const dto: UserRegisterDto = { ...testUser1 };
      repository.getUserByAccount.mockResolvedValue(null);
      const result = await service.register(dto);
      expect(repository.getUserByAccount).toHaveBeenCalled();
      expect(repository.getUserByAccount).toHaveBeenCalledWith(
        dto.account,
        expect.any(EntityManager),
      );
      expect(repository.register).toHaveBeenCalled();
      expect(repository.register).toHaveBeenCalledWith(
        dto,
        expect.any(EntityManager),
      );
      expect(result).toEqual({ ...testUser1, id: 1 });
    });
  });

  describe("login", () => {
    it("should return user", async () => {
      const dto: UserLoginDto = { ...testAccount1 };
      const result = await service.login(dto);
      expect(repository.login).toHaveBeenCalled();
      expect(repository.login).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ ...testUser1, id: 1 });
    });
  });
});
