import { Controller, Get } from "@nestjs/common";


@Controller("app")
export class AppController {
    @Get()
    info() {
        return "Root endpoint";
    }
}
