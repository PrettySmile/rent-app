import { IsString } from "class-validator";

export class UserRegisterDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  account: string;

  @IsString()
  password: string;
}

export class UserLoginDto {
  account: string;
  password: string;
}
