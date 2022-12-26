import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Cat as CatModel } from '@prisma/client';

import { AppService } from './app.service';
import { CatService } from './cat.service';

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
  getCats() {
    return this.catService.cats({});
  }

  @Get('cat/:id')
  getCat(@Param('id') id: string): Promise<CatModel> {
    return this.catService.cat({ id });
  }

  @Get('cat/by-name/:name')
  getCatByName(@Param('name') name: string): Promise<CatModel[]> {
    return this.catService.cats({ where: { name }});
  }

  @Post('cat')
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
