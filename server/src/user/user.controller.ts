import { Controller, Get, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { UserService } from './user.service'
import { GetUser } from '../auth/decorator'
import { JwtGuard } from '../auth/guard'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('me')
	findOne(@GetUser() user: User) {
		return user
	}
}
