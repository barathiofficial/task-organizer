import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { TaskModule } from './task/task.module'
import { UserModule } from './user/user.module'
import { validate } from './utils/env.validate'

@Module({
	imports: [
		ConfigModule.forRoot({
			validate,
			isGlobal: true
		}),
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, '..', '..', 'react', 'dist')
		}),
		DatabaseModule,
		AuthModule,
		UserModule,
		TaskModule
	]
})
export class AppModule {}
