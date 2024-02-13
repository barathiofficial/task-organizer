import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetUser = createParamDecorator(
	(data: string | undefined, ctx: ExecutionContext) => {
		const user = ctx.switchToHttp().getRequest().user
		console.log({ user })

		if (user && data && data in user) {
			return user[data]
		}

		console.log('Hit here')

		return user
	}
)
