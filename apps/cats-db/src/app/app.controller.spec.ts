import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatService } from './cat.service';
import { PrismaService } from './prisma.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, CatService, PrismaService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to cats-db!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to cats-db!',
      });
    });
  });
});
