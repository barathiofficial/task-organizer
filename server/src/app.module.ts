import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { validate } from 'class-validator'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			validate,
			isGlobal: true
		}),
		DatabaseModule,
		AuthModule,
		UserModule
	]
})
export class AppModule {}
