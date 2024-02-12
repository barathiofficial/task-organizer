import { Injectable } from '@nestjs/common'
import { AuthDto } from '../auth/dto'
import { DatabaseService } from '../database/database.service'
import { UpdatePasswordDto, UpdateUserDto } from './dto'

@Injectable()
export class UserService {
	constructor(private db: DatabaseService) {}

	create(data: AuthDto) {
		return this.db.user.create({ data })
	}

	findOne(id: string) {
		return this.db.user.findUnique({
			where: {
				id
			}
		})
	}

	findOneByEmail(email: string) {
		return this.db.user.findUnique({
			where: {
				email
			}
		})
	}

	update(data: UpdateUserDto, id: string) {
		return this.db.user.update({
			data,
			where: {
				id
			}
		})
	}

	updatePassword(data: UpdatePasswordDto, id: string) {
		return this.db.user.update({
			data,
			where: {
				id
			}
		})
	}
}
