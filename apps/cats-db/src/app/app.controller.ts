import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Param,
  Post,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { Cat as CatModel } from '@prisma/client';

import {
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { CatService } from './cat.service';
import { CatResponse, CreateCat, QueryCatsDTO } from './types';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catService: CatService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('cat')
  @ApiResponse({
    status: 200,
    type: [CatResponse],
    description: 'The complete list of cats in database,',
  })
  @ApiQuery({
    type: QueryCatsDTO,
    description: 'The query object for pagination',
  })
  getCats(
    @Query('skip', ParseIntPipe, new DefaultValuePipe(0)) skip: number,
    @Query('take', ParseIntPipe, new DefaultValuePipe(5)) take: number
  ) {
    return this.catService.cats({ skip: skip, take });
  }

  @Get('cat/:id')
  @ApiResponse({
    status: 200,
    type: CatResponse,
    description: 'The cat found from the database,',
  })
  getCat(@Param('id') id: string): Promise<CatModel> {
    return this.catService.cat({ id });
  }

  @Get('cat/by-name/:name')
  @ApiResponse({
    status: 200,
    type: CatResponse,
    description: 'The cat found from the database,',
  })
  getCatByName(@Param('name') name: string): Promise<CatModel[]> {
    return this.catService.cats({ where: { name } });
  }

  @Post('cat')
  @ApiResponse({
    status: 200,
    type: CatResponse,
    description: 'The cat created in database,',
  })
  @ApiBody({ type: CreateCat })
  async createCat(
    @Body()
    catData: CreateCat
  ): Promise<CatModel> {
    return this.catService.createCat(catData);
  }

  @Delete('cat/:id')
  async deletePost(@Param('id') id: string): Promise<CatModel> {
    return this.catService.deleteCat({ id });
  }
}
