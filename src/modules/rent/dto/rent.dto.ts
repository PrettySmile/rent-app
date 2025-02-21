import Scooter from "src/modules/scooter/scooter.entity";
import User from "src/modules/user/user.entity";

export class RentDto {
  userId: number;
  scooterId: number;
}
export class CreateRentDto {
  user: User;
  scooter: Scooter;
  startTime: Date;
  endTime: Date | null;
}

export class BookingDto {
  name: string;
  num: number;
  bookingDate: Date; //date+time
}

// {
//   name:"abc",

// }
