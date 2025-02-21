import { Test, TestingModule } from "@nestjs/testing";
import { ScooterService } from "./scooter.service";
import { testScooter1 } from "../../common/constants/test.constants";
import Scooter from "./scooter.entity";
import { ScooterRepository } from "./scooter.repository";
import { SCOOTER_REPOSITORY } from "../../common/constants/database.constants";

describe("ScooterService", () => {
  let service: ScooterService;
  let repository: jest.Mocked<ScooterRepository>;

  beforeEach(async () => {
    repository = {
      getScooterById: jest
        .fn()
        .mockResolvedValue({ ...testScooter1, id: 1 } as Scooter),
    } as Partial<ScooterRepository> as jest.Mocked<ScooterRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScooterService,
        {
          provide: SCOOTER_REPOSITORY,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<ScooterService>(ScooterService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe("getScooterById", () => {
    it("should return scooter", async () => {
      const scooterId: number = 1;
      const result = await service.getScooterById(scooterId);
      expect(repository.getScooterById).toHaveBeenCalled();
      expect(repository.getScooterById).toHaveBeenCalledWith(scooterId);
      expect(result).toEqual({ ...testScooter1, id: 1 });
    });
  });
});
