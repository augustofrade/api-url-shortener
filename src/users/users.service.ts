import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private configService: ConfigService
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findById(id: string): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });
        user.password = undefined;
        return user;
    }

    exists(email: string): Promise<boolean> {
        return this.usersRepository.exist({ where: { email } });
    }
    
    async create(data: CreateUserDto): Promise<User> {
        const user = new User();
        user.email = data.email;
        user.password = data.password;
        user.username = data.username;
        return await this.usersRepository.save(user);
    }

    async delete(id: string) {
        const result = await this.usersRepository.delete({ id });
        return result.affected && result.affected === 1;
    }
}
