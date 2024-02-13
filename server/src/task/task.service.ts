import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../database/database.service'
import { CreateTaskDto, UpdateTaskDto } from './dto'

@Injectable()
export class TaskService {
	constructor(private db: DatabaseService) {}

	create(userId: string, data: CreateTaskDto) {
		return this.db.task.create({
			data: {
				title: data.title,
				userId: userId
			}
		})
	}

	findAll(userId: string) {
		return this.db.task.findMany({
			where: {
				userId
			}
		})
	}

	findOne(id: string, userId: string) {
		return this.db.task.findUnique({
			where: {
				userId,
				id
			}
		})
	}

	update(id: string, userId: string, data: UpdateTaskDto) {
		return this.db.task.update({
			data,
			where: {
				id,
				userId
			}
		})
	}

	remove(id: string, userId: string) {
		return this.db.task.delete({
			where: {
				id,
				userId
			}
		})
	}
}
