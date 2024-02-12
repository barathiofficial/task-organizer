import {
	BadRequestException,
	INestApplication,
	ValidationPipe
} from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as pactum from 'pactum'
import { AppModule } from '../src/app.module'
import { AuthDto } from '../src/auth/dto'
import { DatabaseService } from '../src/database/database.service'

describe('app e2e', () => {
	let app: INestApplication
	let db: DatabaseService

	beforeAll(async () => {
		const appModuleRef = await Test.createTestingModule({
			imports: [AppModule]
		}).compile()

		app = appModuleRef.createNestApplication()

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

		await app.init()
		await app.listen(3002)

		db = app.get(DatabaseService)

		await db.cleanDB()
		pactum.request.setBaseUrl('http://localhost:3002')
	})

	afterAll(() => {
		app.close()
	})

	const authDto: AuthDto = {
		email: 'barathiofficial@gmail.com',
		password: 'BAra!@12'
	}

	const invalidAuthDto: AuthDto = {
		email: 'barathi',
		password: '12345678'
	}

	const userSchema = {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				format: 'uuid'
			},
			email: {
				type: 'string',
				const: authDto.email
			},
			name: {
				type: 'null',
				const: null
			},
			createdAt: {
				type: 'string',
				format: 'date-time'
			},
			updatedAt: {
				type: 'string',
				format: 'date-time'
			}
		},
		required: ['id', 'email', 'createdAt', 'updatedAt']
	}

	describe('auth', () => {
		describe('signup', () => {
			it('should throw required error', () => {
				return pactum
					.spec()
					.post('/auth/signup')
					.withBody({})
					.expectStatus(400)
					.expectBody({
						error: 'Bad Request',
						message: [
							{
								error: 'Email is required',
								field: 'email'
							},
							{
								error: 'Password is required',
								field: 'password'
							}
						],
						statusCode: 400
					})
			})

			it('should throw validation error', () => {
				return pactum
					.spec()
					.post('/auth/signup')
					.withBody(invalidAuthDto)
					.expectStatus(400)
					.expectBody({
						error: 'Bad Request',
						message: [
							{
								error: 'Invalid email',
								field: 'email'
							},
							{
								error: 'Password is not strong enough',
								field: 'password'
							}
						],
						statusCode: 400
					})
			})

			it('should signup successfully', () => {
				return pactum
					.spec()
					.post('/auth/signup')
					.withBody(authDto)
					.expectStatus(201)
					.expectJsonSchema(userSchema)
			})
		})

		describe('login', () => {
			it('should throw required error', () => {
				return pactum
					.spec()
					.post('/auth/login')
					.withBody({})
					.expectStatus(400)
					.expectBody({
						error: 'Bad Request',
						message: [
							{
								error: 'Email is required',
								field: 'email'
							},
							{
								error: 'Password is required',
								field: 'password'
							}
						],
						statusCode: 400
					})
			})

			it('should throw validation error', () => {
				return pactum
					.spec()
					.post('/auth/login')
					.withBody(invalidAuthDto)
					.expectStatus(400)
					.expectBody({
						error: 'Bad Request',
						message: [
							{
								error: 'Invalid email',
								field: 'email'
							},
							{
								error: 'Password is not strong enough',
								field: 'password'
							}
						],
						statusCode: 400
					})
			})

			it('should login successfully', () => {
				return pactum
					.spec()
					.post('/auth/login')
					.withBody(authDto)
					.expectStatus(200)
					.expectJsonSchema({
						type: 'object',
						properties: {
							access_token: {
								type: 'string'
							}
						},
						required: ['access_token']
					})
					.stores('token', 'access_token')
			})
		})
	})

	describe('user', () => {
		describe('get me', () => {
			it('should throw authorization header missing error', () => {
				return pactum
					.spec()
					.get('/users/me')
					.expectStatus(401)
					.expectBody({
						error: 'Unauthorized',
						message: 'Authorization header missing',
						statusCode: 401
					})
			})

			it('should throw invalid bearer token error', () => {
				return pactum
					.spec()
					.get('/users/me')
					.expectStatus(401)
					.withHeaders('Authorization', '')
					.expectBody({
						error: 'Unauthorized',
						message: 'Invalid bearer token',
						statusCode: 401
					})
			})

			it('should fetch current user data', () => {
				return pactum
					.spec()
					.get('/users/me')
					.withHeaders('Authorization', 'Bearer $S{token}')
					.expectStatus(200)
					.expectJsonSchema(userSchema)
			})
		})
	})
})
