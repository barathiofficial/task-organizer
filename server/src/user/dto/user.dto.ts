import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator'

export class UpdateUserDto {
	@ApiProperty()
	@IsString({ message: 'Name should be a string' })
	@IsNotEmpty({ message: 'Name is required' })
	name: string
}

export class UpdatePasswordDto {
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
