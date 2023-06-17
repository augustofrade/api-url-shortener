import { Injectable, PipeTransform } from "@nestjs/common";

import { UsersService } from "../users.service";

@Injectable()
export class FindUserPipe implements PipeTransform {
    constructor (
        private usersService: UsersService
    ) {}

    transform(value: any) {
        return this.usersService.findById(value);
    }
}