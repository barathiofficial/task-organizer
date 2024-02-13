import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { GetUser } from '../auth/decorator'
import { JwtGuard } from '../auth/guard'
import { CreateTaskDto, UpdateTaskDto } from './dto'
import { TaskService } from './task.service'

@ApiBearerAuth()
@ApiTags('tasks')
@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Post()
	create(@Body() data: CreateTaskDto, @GetUser('id') userId: string) {
		try {
			return this.taskService.create(userId, data)
		} catch (error) {
			throw error
		}
	}

	@Get()
	findAll(@GetUser('id') userId: string) {
		return this.taskService.findAll(userId)
	}

	@Get(':id')
	findOne(@Param('id') id: string, @GetUser('id') userId: string) {
		return this.taskService.findOne(id, userId)
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@GetUser('id') userId: string,
		@Body() data: UpdateTaskDto
	) {
		return this.taskService.update(id, userId, data)
	}

	@Delete(':id')
	remove(@Param('id') id: string, @GetUser('id') userId: string) {
		return this.taskService.remove(id, userId)
	}
}
