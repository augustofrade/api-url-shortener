import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UsePipes } from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { EmailUsedPipe } from "./entities/email-used.pipe";
import { FindUserPipe } from "./entities/find-user.pipe";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async findAll() {
		return await this.usersService.findAll();
	}

	@Get(":id")
	findById(@Param("id", ParseUUIDPipe, FindUserPipe) user: User) {
		return user;
	}

	@Delete(":id")
	async remove(@Param("id", ParseUUIDPipe) id: string) {
		// TODO: test if id is the same as the authenticated user
		const deleted = await this.usersService.delete(id);
		if(deleted)
			return { msg: "Account deleted successfully" };
		else
			return { msg: "Could not delete your account", error: true };
	}

	@Post()
	@UsePipes(EmailUsedPipe)
	async create(@Body() user: CreateUserDto) {
		return await this.usersService.create(user);
	}

}
