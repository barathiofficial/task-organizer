import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator'

export class AuthDto {
	@ApiProperty()
	@IsEmail({}, { message: 'Invalid email' })
	@IsNotEmpty({ message: 'Email is required' })
	email: string

	@ApiProperty()
	@IsStrongPassword(
		{
			minLength: 8,
			minLowercase: 2,
			minNumbers: 2,
			minSymbols: 2,
			minUppercase: 2
		},
		{ message: 'Password is not strong enough' }
	)
	@IsNotEmpty({ message: 'Password is required' })
	password: string
}
