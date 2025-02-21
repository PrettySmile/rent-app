<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## 說明
- node v22.13.1
- npm v10.9.2
- mysql v8.0

## 專案目標
1. 使用 [NestJS](https://github.com/nestjs/nest)  框架
2. 使用 TypeScript 撰寫
3. 使用 TypeORM 連接 MySQL(關聯型資料庫)
4. 使用 NestJS i18n 語系
5. 使用 全域的錯誤處理器，保持乾淨的Controller
6. 使用 sendOk()，保持API回傳一致性
7. 使用 NestJS 單元測試 (@nestjs/testing)
8. 使用 class-validator 及 class-transformer ，檢查參數型別

## API說明
### User
1. 註冊新使用：POST /user/register
2. 用戶登入：POST /user/login
3. 取得所有User：GET /user/getAllUsers
4. 取得單一User：GET /user/getUserById?userId=1

### Scooter
1. 取得所有可租借的車輛：GET /scooter/getAllScooters
2. 取得單一車輛資訊：GET /scooter/getScooterById?scooterId=1
3. 創建新的車輛（可選）：POST /scooter/create

### Rent
1. 租借車輛：POST /rent/
1. 歸還車輛：POST /rent/return
2. 取得用戶的租借紀錄：GET /rent/user/{user_id}
3. 取消租借：DELETE /rent/{id}

> 攜帶「?lang=en」可變更回傳語系。

## Project setup
```bash
$ npm install
```

## Compile and run the project
```bash
# development
# 若有增刪修語系，需採用此指令
$ npm run start

# watch mode
# 不會更新語系檔到/dist
$ npm run start:dev
```

## Run database
```
npm run db:run
```

## Run tests
### 全部測試
```bash
# unit tests
$ npm run test
```
### 單檔測試
```
npx jest user.service.spec.ts
```
備註：
為測試項目新增 .only 可測試單一方法。(如：describe.only / it.only。)

## 新增 DB Migration
```
npm run db:generate
```
  
# DB Table 說明
1. User => 使用者
2. Scooter => 車輛資訊
3. Rent => 使用者租借車輛資料



