import { ApiProperty, PickType } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { IsEmail, IsNotEmpty, IsStrongPassword, IsUUID } from 'class-validator'

export class UserDto implements User {
	@ApiProperty({ example: 'ba7dd23c-618f-47e4-ad89-e696b71e8077' })
	@IsUUID('all', { message: 'Invalid id' })
	@IsNotEmpty({ message: 'Id is required' })
	id: string

	@ApiProperty({ example: 'johndoe@example.com' })
	@IsEmail({}, { message: 'Invalid email' })
	@IsNotEmpty({ message: 'Email is required' })
	email: string

	@ApiProperty({ example: 'JOhn!@12' })
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

	@ApiProperty({ example: 'John Doe' })
	@IsNotEmpty({ message: 'Name is required' })
	name: string

	@ApiProperty({ example: new Date() })
	createdAt: Date

	@ApiProperty({ example: new Date() })
	updatedAt: Date
}

export class UpdateUserDto extends PickType(UserDto, ['name'] as const) {}

export class UpdatePasswordDto extends PickType(UserDto, [
	'password'
] as const) {}
