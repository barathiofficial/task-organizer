import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	signup(@Body() data: AuthDto) {
		return this.authService.signup(data)
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	login(@Body() data: AuthDto) {
		return this.authService.login(data)
	}
}
