import {
	BadRequestException,
	ConflictException,
	Injectable,
	InternalServerErrorException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import * as argon from 'argon2'
import { DatabaseService } from '../database/database.service'
import { AuthDto } from './dto'

@Injectable()
export class AuthService {
	constructor(
		private db: DatabaseService,
		private jwt: JwtService,
		private config: ConfigService
	) {}

	async signup(data: AuthDto) {
		try {
			const password = await argon.hash(data.password, {})

			data.password = password

			const user = await this.db.user.create({
				data
			})

			delete user.password

			return user
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ConflictException('Email already exist')
				}
			}

			throw new InternalServerErrorException(error)
		}
	}

	async login(data: AuthDto) {
		try {
			const user = await this.db.user.findUnique({
				where: {
					email: data.email
				}
			})

			if (!user) {
				throw new BadRequestException('Wrong email/password')
			}

			const verified = await argon.verify(user.password, data.password)

			if (!verified) {
				throw new BadRequestException('Wrong email/password')
			}

			delete user.password

			const access_token = await this.signToken(user.id)

			return { access_token }
		} catch (error) {
			throw error
		}
	}

	signToken(userId: string) {
		const payload = {
			sub: userId
		}

		return this.jwt.signAsync(payload, {
			expiresIn: '1m',
			secret: this.config.get('JWT_SECRET')
		})
	}
}
