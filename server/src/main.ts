import { BadRequestException, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			stopAtFirstError: true,
			exceptionFactory: (errors) => {
				return new BadRequestException(
					errors.map((error) => {
						return {
							field: error.property,
							error: Object.values(error.constraints)[0]
						}
					})
				)
			}
		})
	)

	const config = new DocumentBuilder()
		.setTitle('Task Oragnizer API')
		.setDescription('Task Oragnizer API')
		.setVersion('1.0')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, document)

	await app.listen(3001)
}

bootstrap()
