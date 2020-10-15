import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv'
dotenv.config()

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST_DB,
  port: parseInt(process.env.PORT_DB),
  username: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_DB,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
}