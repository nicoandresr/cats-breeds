import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Cat as CatModel } from '@prisma/client';

import { ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CatService } from './cat.service';
import { CatResponse } from './types';

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
  getCats() {
    return this.catService.cats({});
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
  @Get('cat/:id')
  @ApiResponse({
    status: 200,
    type: CatResponse,
    description: 'The cat found from the database,',
  })
  getCatByName(@Param('name') name: string): Promise<CatModel[]> {
    return this.catService.cats({ where: { name } });
  }

  @Post('cat')
  @Get('cat/:id')
  @ApiResponse({
    status: 200,
    type: CatResponse,
    description: 'The cat created in database,',
  })
  async createCat(
    @Body()
    catData: CatModel
  ): Promise<CatModel> {
    return this.catService.createCat(catData);
  }

  @Delete('cat/:id')
  async deletePost(@Param('id') id: string): Promise<CatModel> {
    return this.catService.deleteCat({ id });
  }
}
