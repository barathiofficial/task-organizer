import { plainToInstance } from 'class-transformer'
import {
	IsNotEmpty,
	IsNumberString,
	IsString,
	validateSync
} from 'class-validator'

class EnvDto {
	@IsString({ message: 'Must be a string' })
	@IsNotEmpty({ message: 'Required' })
	MYSQL_USER: string

	@IsString({ message: 'Must be a string' })
	@IsNotEmpty({ message: 'Required' })
	MYSQL_PASSWORD: string

	@IsNumberString({}, { message: 'Must be a number' })
	@IsNotEmpty({ message: 'Required' })
	MYSQL_PORT: string

	@IsString({ message: 'Must be a string' })
	@IsNotEmpty({ message: 'Required' })
	MYSQL_DATABASE: string

	@IsString({ message: 'Must be a string' })
	@IsNotEmpty({ message: 'Required' })
	DATABASE_URL: string

	@IsString({ message: 'Must be a string' })
	@IsNotEmpty({ message: 'Required' })
	JWT_SECRET: string
}

class EnvException extends Error {
	constructor(message: string) {
		super(message)
	}
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvDto, config, {
		enableImplicitConversion: true
	})

	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false
	})

	if (errors.length > 0) {
		let error = errors
			.map((error) => {
				return Object.values(error.constraints)
					.map((message) => {
						return message + ' - ' + error.property
					})
					.join('\n\t')
			})
			.join('\n\t')

		error = '\t' + error + '\n'

		throw new EnvException(error)
	}

	return validatedConfig
}
