import { ApiProperty, PartialType, PickType } from '@nestjs/swagger'
import { $Enums, Task } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator'

export class TaskDto implements Task {
	@ApiProperty({ example: 'ba7dd23c-618f-47e4-ad89-e696b71e8077' })
	@IsUUID('all', { message: 'Invalid id' })
	@IsNotEmpty({ message: 'Id is required' })
	id: string

	@IsNotEmpty({ message: 'Title is required' })
	title: string

	@IsEnum($Enums.TaskStatus, { message: 'Invalid status' })
	@IsNotEmpty({ message: 'Status is required' })
	status: $Enums.TaskStatus

	@IsUUID('all', { message: 'Invalid id' })
	@IsNotEmpty({ message: 'User id is required' })
	userId: string

	@ApiProperty({ example: new Date() })
	createdAt: Date

	@ApiProperty({ example: new Date() })
	updatedAt: Date
}

export class CreateTaskDto extends PickType(TaskDto, ['title'] as const) {}

export class UpdateTaskDto extends PartialType(
	PickType(TaskDto, ['title', 'status'] as const)
) {}
