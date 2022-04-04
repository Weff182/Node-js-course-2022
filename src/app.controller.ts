import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Начальный функционал')
@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @ApiOperation({ summary: 'Создание начальных пластинок пластинок и ролей' })
  @ApiResponse({ status: 200 })
  @Get()
  createStartFunctionality(): Promise<void> {
    return this.appService.getStartFunction();
  }
}
