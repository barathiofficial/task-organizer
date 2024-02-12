import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as argon from 'argon2'

@Injectable()
export class AuthService {
	constructor(
		private jwt: JwtService,
		private config: ConfigService
	) {}

	hashPassword(password: string) {
		return argon.hash(password)
	}

	verifyPassword(hash: string, password: string) {
		return argon.verify(hash, password)
	}

	signToken(userId: string) {
		const payload = {
			sub: userId
		}

		return this.jwt.signAsync(payload, {
			expiresIn: '30d',
			secret: this.config.get('JWT_SECRET')
		})
	}
}
