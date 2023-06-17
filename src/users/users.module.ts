import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
	imports: [TypeOrmModule.forFeature([User]), ConfigModule],
	exports: [TypeOrmModule],
	controllers: [UsersController],
	providers: [UsersService]
})
export class UsersModule {}
