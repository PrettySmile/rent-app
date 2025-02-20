import { Body, Controller, Post } from "@nestjs/common";
import { RentService } from "./rent.service";
import { RentDto } from "./dto/rent.dto";
import { sendOk } from "../../response.util";

@Controller("rent")
export class RentController {
  constructor(private readonly rentService: RentService) {}

  //租借車輛
  @Post()
  async rent(@Body() dto: RentDto) {
    const rent = await this.rentService.rent(dto);
    return sendOk(rent);
  }
}
