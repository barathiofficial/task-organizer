import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetUser = createParamDecorator(
	(data: string | undefined, ctx: ExecutionContext) => {
		const user = ctx.switchToHttp().getRequest().user
		if (data && data in user) {
			return user[data]
		}

		return user
	}
)
