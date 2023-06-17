import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

import { CreateUserDto } from "../dto/create-user.dto";
import { UsersService } from "../users.service";

@Injectable()
export class EmailUsedPipe implements PipeTransform {
    constructor(
        private usersService: UsersService
    ) {}

    async transform(value: CreateUserDto) {
        const userExists = await this.usersService.exists(value.email);
        if(userExists)
            return value;
        else
            throw new BadRequestException("E-mail already in use");
    }
    
}