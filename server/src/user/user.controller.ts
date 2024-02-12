import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	UseGuards
} from '@nestjs/common'
import { User } from '@prisma/client'
import { GetUser } from '../auth/decorator'
import { JwtGuard } from '../auth/guard'
import { UserService } from './user.service'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@HttpCode(HttpStatus.OK)
	@Get('me')
	findOne(@GetUser() user: User) {
		return user
	}
}
