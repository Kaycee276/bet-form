import { Test, TestingModule } from '@nestjs/testing';
import { FixturesController } from './fixtures.controller';
import { FixturesService } from './fixtures.service';

describe('FixturesController', () => {
  let controller: FixturesController;

  const mockFixturesService = {
    findAll: jest.fn().mockResolvedValue([
      {
        id: 'fix-1',
        homeTeamName: 'Arsenal',
        awayTeamName: 'Chelsea',
        league: 'Premier League',
        kickoffAt: new Date(),
        status: 'OPEN',
      },
    ]),
    findOne: jest.fn().mockImplementation((id: string) => {
      if (id === 'fix-1') {
        return Promise.resolve({
          id: 'fix-1',
          homeTeamName: 'Arsenal',
          awayTeamName: 'Chelsea',
          squads: [],
        });
      }
      return Promise.resolve(null);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FixturesController],
      providers: [{ provide: FixturesService, useValue: mockFixturesService }],
    }).compile();

    controller = module.get<FixturesController>(FixturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of fixtures', async () => {
      const result = await controller.findAll();
      expect(mockFixturesService.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('should return fixture by id', async () => {
      const result = await controller.findOne('fix-1');
      expect(mockFixturesService.findOne).toHaveBeenCalledWith('fix-1');
      expect(result).toBeDefined();
    });
  });
});
