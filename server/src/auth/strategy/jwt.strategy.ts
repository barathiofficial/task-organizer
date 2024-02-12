import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { DatabaseService } from '../../database/database.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		config: ConfigService,
		private db: DatabaseService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get('JWT_SECRET')
		})
	}

	async validate(payload: any) {
		const user = await this.db.user.findUnique({
			where: {
				id: payload.sub
			}
		})

		if (!user) {
			throw new Error('Token missing')
		}

		delete user.password

		return user
	}
}
