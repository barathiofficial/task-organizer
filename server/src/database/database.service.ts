import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class DatabaseService extends PrismaClient {
	async onModuleInit() {
		await this.$connect()
	}

	async cleanDB() {
		return this.$transaction([
			this.task.deleteMany(),
			this.user.deleteMany()
		])
	}
}
