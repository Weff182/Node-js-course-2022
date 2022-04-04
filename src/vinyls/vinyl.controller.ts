import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
//roles functional
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
//DTO
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetVynilByIdDto } from './dto/get-vinylbyId.dto';
//vinyls functional
import { Vinyls } from './vinyl.model';
import { VinylService } from './vinyl.service';
//swagger
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Винилы')
@Controller('vinyls')
export class VinylsController {
  constructor(private vinylService: VinylService) {}

  @ApiOperation({ summary: 'Функция для создания винила' })
  @ApiResponse({ status: 201 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createVinyl(
    @Body() dto: CreateVinylDto,
    @UploadedFile() image,
  ): Promise<void> {
    return this.vinylService.create(dto, image);
  }

  @ApiOperation({ summary: 'Функция для получения массиива всех винилов' })
  @ApiResponse({ status: 200, type: [Vinyls] })
  @Get()
  getVinyls(): Promise<Vinyls[]> {
    return this.vinylService.getVinyls();
  }

  @ApiOperation({ summary: 'Функция для создания обзора' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200 })
  @Post(':id/reviews')
  createReview(
    @Param('id') id: number,
    @Body() description: CreateReviewDto,
    @Req() req: Request,
  ): Promise<void> {
    return this.vinylService.addReview(description, req, id);
  }

  @ApiOperation({ summary: 'Функция для покупки винила' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  buyVinyls(@Param('id') id: number, @Req() req: Request): Promise<void> {
    return this.vinylService.buyVinyls(req, id);
  }

  @ApiOperation({
    summary: 'Функция для поиска винила по названию и имени автора',
  })
  @ApiResponse({ status: 200, type: Vinyls })
  @Get('search')
  getVinylByName(@Body() searchObject: GetVynilByIdDto): Promise<Vinyls> {
    return this.vinylService.getVinylByName(searchObject);
  }

  @ApiOperation({
    summary: 'Функция для получения отортированного массива винилов',
  })
  @ApiResponse({ status: 200, type: [Vinyls] })
  @Get('sortVynils')
  getSortVinyls(): Promise<Vinyls[]> {
    return this.vinylService.getSortVinyls();
  }
}
