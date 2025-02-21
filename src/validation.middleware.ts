// // validation.middleware.ts
// import {
//   Injectable,
//   NestMiddleware,
//   HttpException,
//   HttpStatus,
// } from "@nestjs/common";
// import { plainToInstance } from "class-transformer";
// import { validate } from "class-validator";

// @Injectable()
// export class ValidationMiddleware implements NestMiddleware {
//   async use(req: any, res: any, next: () => void) {
//     // 針對 POST 請求的 body 資料進行型別檢查
//     const dto = plainToInstance(req.body.constructor, req.body); // 使用 class-transformer 來轉換資料為 DTO 實例
//     const errors = await validate(dto); // 使用 class-validator 來檢查資料

//     if (errors.length > 0) {
//       // 如果驗證失敗，回傳 400 錯誤
//       throw new HttpException(
//         { message: "Validation failed", errors: errors },
//         HttpStatus.BAD_REQUEST,
//       );
//     }

//     // 如果沒有錯誤，繼續處理請求
//     next();
//   }
// }
