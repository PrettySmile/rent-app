import { Injectable, Inject } from "@nestjs/common";
import {
  DATA_SOURCE,
  USER_REPOSITORY,
} from "../../common/constants/database.constants";
import User from "./user.entity";
import { UserRepository } from "./user.repository";
import { UserLoginDto, UserRegisterDto } from "./dto/user.dto";
import { ApplicationError } from "../../applicationError";
import { DataSource } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @Inject(DATA_SOURCE)
    private readonly dataSource: DataSource,

    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
  ) {}

  async getUserById(userId: number): Promise<User> {
    return await this.userRepository.getUserById(userId);
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }

  async register(dto: UserRegisterDto) {
    return await this.dataSource.manager.transaction(async (manager) => {
      const isAccountExist = await this.userRepository.getUserByAccount(
        dto.account,
        manager,
      );
      if (isAccountExist) throw new ApplicationError("errors.A006");
      return await this.userRepository.register(dto, manager);
    });
  }

  async login(dto: UserLoginDto) {
    const user = await this.userRepository.login(dto);
    return user;
  }
}
