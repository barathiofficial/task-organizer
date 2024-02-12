import { plainToInstance } from 'class-transformer'
import {
	IsNotEmpty,
	IsNumberString,
	IsString,
	validateSync
} from 'class-validator'

class EnvDto {
	@IsString({ message: 'MYSQL_USER must be a string' })
	@IsNotEmpty({ message: 'MYSQL_USER required' })
	MYSQL_USER: string

	@IsString({ message: 'MYSQL_PASSWORD must be a string' })
	@IsNotEmpty({ message: 'MYSQL_PASSWORD required' })
	MYSQL_PASSWORD: string

	@IsNumberString({}, { message: 'MYSQL_PORT must be a number' })
	@IsNotEmpty({ message: 'MYSQL_PORT required' })
	MYSQL_PORT: string

	@IsString({ message: 'MYSQL_DATABASE must be a string' })
	@IsNotEmpty({ message: 'MYSQL_DATABASE required' })
	MYSQL_DATABASE: string

	@IsString({ message: 'DATABASE_URL must be a string' })
	@IsNotEmpty({ message: 'DATABASE_URL required' })
	DATABASE_URL: string

	@IsString({ message: 'JWT_SECRET must be a string' })
	@IsNotEmpty({ message: 'JWT_SECRET required' })
	JWT_SECRET: string
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvDto, config, {
		enableImplicitConversion: true
	})

	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false
	})

	if (errors.length > 0) {
		const error = errors
			.map((error) => Object.values(error.constraints).join())
			.join()

		throw new Error(error)
	}

	return validatedConfig
}
