import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator'

export class AuthDto {
	@IsEmail({}, { message: 'Invalid email' })
	@IsNotEmpty({ message: 'Email is required' })
	email: string

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
