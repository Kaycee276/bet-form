import { Test, TestingModule } from '@nestjs/testing';
import { FixturesService } from './fixtures.service';
import { PrismaService } from '../prisma/prisma.service';

describe('FixturesService', () => {
  let service: FixturesService;

  const mockFixtures = [
    {
      id: 'fix-1',
      league: 'Premier League',
      homeTeamId: 't1',
      awayTeamId: 't2',
      homeTeam: { id: 't1', name: 'Arsenal', badge: null },
      awayTeam: { id: 't2', name: 'Chelsea', badge: null },
      kickoffAt: new Date(),
      round: 'Matchday 1',
      venue: 'Emirates Stadium',
      status: 'OPEN',
      homeFormation: '4-3-3',
      awayFormation: '4-2-3-1',
      homeStartXI: null,
      awayStartXI: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      squads: [],
    },
  ];

  const mockPrismaService = {
    fixture: {
      findMany: jest.fn().mockResolvedValue(mockFixtures),
      findUnique: jest
        .fn()
        .mockImplementation(({ where: { id } }: { where: { id: string } }) => {
          const found = mockFixtures.find((f) => f.id === id);
          return Promise.resolve(found || null);
        }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FixturesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<FixturesService>(FixturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of formatted fixtures', async () => {
      const result = await service.findAll();
      expect(mockPrismaService.fixture.findMany).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0].homeTeamName).toBe('Arsenal');
      expect(result[0].awayTeamName).toBe('Chelsea');
    });
  });

  describe('findOne', () => {
    it('should return a single fixture by id', async () => {
      const result = await service.findOne('fix-1');
      expect(mockPrismaService.fixture.findUnique).toHaveBeenCalledWith({
        where: { id: 'fix-1' },
        include: {
          homeTeam: true,
          awayTeam: true,
          squads: { include: { player: true } },
        },
      });
      expect(result).toBeDefined();
      expect(result?.id).toBe('fix-1');
    });

    it('should return null if fixture does not exist', async () => {
      const result = await service.findOne('non-existent');
      expect(result).toBeNull();
    });
  });
});
