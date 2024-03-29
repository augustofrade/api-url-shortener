import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { User } from "./users/entities/user.entity";
import { UsersModule } from "./users/users.module";


@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: "URLShortener",
            entities: [User],
            synchronize: true,
          }),
          UsersModule
    ],
    controllers: [AppController]
})
export class AppModule {}
