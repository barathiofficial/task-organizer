import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	HttpStatus,
	InternalServerErrorException,
	Post
} from '@nestjs/common'
import {
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiTags
} from '@nestjs/swagger'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'
import { UserDto } from '../user/dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService
	) {}

	@Post('signup')
	@ApiCreatedResponse({ type: UserDto })
	@ApiConflictResponse({ type: ConflictException })
	async signup(@Body() data: AuthDto) {
		try {
			data.password = await this.authService.hashPassword(data.password)

			const user = await this.userService.create(data)

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

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Body() data: AuthDto) {
		try {
			const user = await this.userService.findOneByEmail(data.email)

			if (!user) {
				throw new BadRequestException('Wrong email/password')
			}

			const verified = await this.authService.verifyPassword(
				user.password,
				data.password
			)

			if (!verified) {
				throw new BadRequestException('Wrong email/password')
			}

			delete user.password

			const access_token = await this.authService.signToken(user.id)

			return { access_token, user }
		} catch (error) {
			throw error
		}
	}
}
