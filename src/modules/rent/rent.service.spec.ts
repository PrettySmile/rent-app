import { Test, TestingModule } from "@nestjs/testing";
import { RentService } from "./rent.service";
import { RentRepository } from "./rent.repository";
import {
  RENT_REPOSITORY,
  SCOOTER_REPOSITORY,
  USER_REPOSITORY,
} from "../../common/constants/database.constants";
import { UserRepository } from "../user/user.repository";
import { ScooterRepository } from "../scooter/scooter.repository";
import { DatabaseModule } from "../database/database.module";
import { databaseProvider } from "../database/database.providers";
import { CreateRentDto, RentDto } from "./dto/rent.dto";
import {
  testRent1,
  testScooter1,
  testUser1,
} from "../../common/constants/test.constants";
import User from "../user/user.entity";
import Scooter from "../scooter/scooter.entity";
import { EntityManager } from "typeorm";
import Rent from "./rent.entity";
import dayjs from "dayjs";
import { ApplicationError } from "../../applicationError";

describe("RentService", () => {
  let service: RentService;
  let rentRepository: jest.Mocked<RentRepository>;
  let userRepository: jest.Mocked<UserRepository>;
  let scooterRepository: jest.Mocked<ScooterRepository>;

  beforeEach(async () => {
    rentRepository = {
      getActiveRentalByUserId: jest.fn().mockResolvedValue(null),
      getActiveRentalByScooterId: jest.fn().mockResolvedValue(null),
      createRent: jest.fn().mockResolvedValue({
        user: testUser1,
        scooter: testScooter1,
        ...testRent1,
      }),
    } as Partial<RentRepository> as jest.Mocked<RentRepository>;

    userRepository = {
      getUserById: jest.fn().mockResolvedValue({ ...testUser1, id: 1 } as User),
    } as Partial<UserRepository> as jest.Mocked<UserRepository>;

    scooterRepository = {
      getScooterById: jest
        .fn()
        .mockResolvedValue({ ...testScooter1, id: 1 } as Scooter),
    } as Partial<ScooterRepository> as jest.Mocked<ScooterRepository>;

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        {
          module: DatabaseModule,
          providers: [...databaseProvider],
          exports: [...databaseProvider],
        },
      ],
      providers: [
        RentService,
        {
          provide: RENT_REPOSITORY,
          useValue: rentRepository,
        },
        {
          provide: USER_REPOSITORY,
          useValue: userRepository,
        },
        {
          provide: SCOOTER_REPOSITORY,
          useValue: scooterRepository,
        },
      ],
    }).compile();

    service = module.get<RentService>(RentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(rentRepository).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(scooterRepository).toBeDefined();
  });

  describe("rent", () => {
    it("should return rent", async () => {
      jest
        .spyOn(dayjs.prototype, "toDate")
        .mockReturnValue(testRent1.start_time);
      const dto: RentDto = { userId: 1, scooterId: 1 };
      const result = await service.rent(dto);
      expect(userRepository.getUserById).toHaveBeenCalled();
      expect(userRepository.getUserById).toHaveBeenCalledWith(
        dto.userId,
        expect.any(EntityManager),
      );
      expect(scooterRepository.getScooterById).toHaveBeenCalled();
      expect(scooterRepository.getScooterById).toHaveBeenCalledWith(
        dto.scooterId,
        expect.any(EntityManager),
      );
      expect(rentRepository.getActiveRentalByUserId).toHaveBeenCalled();
      expect(rentRepository.getActiveRentalByUserId).toHaveBeenCalledWith(
        dto.userId,
        expect.any(EntityManager),
      );
      expect(rentRepository.getActiveRentalByScooterId).toHaveBeenCalled();
      expect(rentRepository.getActiveRentalByScooterId).toHaveBeenCalledWith(
        dto.scooterId,
        expect.any(EntityManager),
      );
      expect(rentRepository.createRent).toHaveBeenCalled();
      expect(rentRepository.createRent).toHaveBeenCalledWith({
        user: { ...testUser1, id: 1 } as User,
        scooter: { ...testScooter1, id: 1 } as Scooter,
        startTime: testRent1.start_time,
        endTime: testRent1.end_time,
      } as CreateRentDto);
      expect(result).toEqual({
        user: testUser1,
        scooter: testScooter1,
        ...testRent1,
      } as Rent);
    });
    it("should return error errors.A003", async () => {
      jest
        .spyOn(dayjs.prototype, "toDate")
        .mockReturnValue(testRent1.start_time);
      const dto: RentDto = { userId: 1, scooterId: 1 };
      rentRepository.getActiveRentalByUserId = jest.fn().mockResolvedValue({
        user: testUser1,
        scooter: testScooter1,
        ...testRent1,
      });
      await expect(service.rent(dto)).rejects.toThrow(
        new ApplicationError("errors.A003"),
      );
      expect(userRepository.getUserById).toHaveBeenCalled();
      expect(userRepository.getUserById).toHaveBeenCalledWith(
        dto.userId,
        expect.any(EntityManager),
      );
      expect(scooterRepository.getScooterById).toHaveBeenCalled();
      expect(scooterRepository.getScooterById).toHaveBeenCalledWith(
        dto.scooterId,
        expect.any(EntityManager),
      );
      expect(rentRepository.getActiveRentalByUserId).toHaveBeenCalled();
      expect(rentRepository.getActiveRentalByUserId).toHaveBeenCalledWith(
        dto.userId,
        expect.any(EntityManager),
      );
    });
    it("should return error errors.A004", async () => {
      jest
        .spyOn(dayjs.prototype, "toDate")
        .mockReturnValue(testRent1.start_time);
      rentRepository.getActiveRentalByScooterId = jest.fn().mockResolvedValue({
        user: testUser1,
        scooter: testScooter1,
        ...testRent1,
      });
      const dto: RentDto = { userId: 1, scooterId: 1 };
      await expect(service.rent(dto)).rejects.toThrow(
        new ApplicationError("errors.A004"),
      );
      expect(userRepository.getUserById).toHaveBeenCalled();
      expect(userRepository.getUserById).toHaveBeenCalledWith(
        dto.userId,
        expect.any(EntityManager),
      );
      expect(scooterRepository.getScooterById).toHaveBeenCalled();
      expect(scooterRepository.getScooterById).toHaveBeenCalledWith(
        dto.scooterId,
        expect.any(EntityManager),
      );
      expect(rentRepository.getActiveRentalByUserId).toHaveBeenCalled();
      expect(rentRepository.getActiveRentalByUserId).toHaveBeenCalledWith(
        dto.userId,
        expect.any(EntityManager),
      );
      expect(rentRepository.getActiveRentalByScooterId).toHaveBeenCalled();
      expect(rentRepository.getActiveRentalByScooterId).toHaveBeenCalledWith(
        dto.scooterId,
        expect.any(EntityManager),
      );
    });
  });
});
