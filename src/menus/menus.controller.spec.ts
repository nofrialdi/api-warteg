import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from './menus.controller';
import { MenusService } from './menus.service';

describe('MenusController', () => {
  let controller: MenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
      providers: [MenusService],
    }).compile();

    controller = module.get<MenuController>(MenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
