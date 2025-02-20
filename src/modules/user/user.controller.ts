import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { sendOk } from "../../response.util";
import { UserLoginDto, UserRegisterDto } from "./dto/user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 取得所有User
   * @returns
   */
  @Get("getAllUsers")
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return sendOk(users);
  }

  /**
   * 取得單一User
   * @param userId 使用者id
   * @returns
   */
  @Get("getUserById")
  async getUserById(@Query("userId") userId: number) {
    const user = await this.userService.getUserById(userId);
    return sendOk(user);
  }

  /**
   * 註冊
   * @returns
   */
  @Post("/register")
  async register(@Body() dto: UserRegisterDto) {
    const user = await this.userService.register(dto);
    return sendOk(user);
  }

  /**
   * 登入
   * @returns
   */
  @Post("/login")
  async login(@Body() dto: UserLoginDto) {
    const user = await this.userService.login(dto);
    return sendOk(user);
  }
}
