import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Patch,
	Post,
	UseGuards
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { GetUser } from '../auth/decorator'
import { JwtGuard } from '../auth/guard'
import { UpdatePasswordDto, UpdateUserDto } from './dto'
import { UserService } from './user.service'

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@HttpCode(HttpStatus.OK)
	@Get('me')
	getMe(@GetUser() user: User) {
		return user
	}

	@HttpCode(HttpStatus.OK)
	@Patch('me')
	async update(@GetUser('id') id: string, @Body() data: UpdateUserDto) {
		try {
			const user = await this.userService.update(data, id)

			delete user.password

			return user
		} catch (error) {
			throw error
		}
	}

	@HttpCode(HttpStatus.OK)
	@Post('change_password')
	async updatePassword(
		@GetUser('id') id: string,
		@Body() data: UpdatePasswordDto
	) {
		try {
			const user = await this.userService.updatePassword(data, id)

			delete user.password

			return {
				message: 'Password updated'
			}
		} catch (error) {
			throw error
		}
	}
}
