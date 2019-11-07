import { Test, TestingModule } from '@nestjs/testing';
import { ActiveDirectoryResolver } from './active-directory.resolver';

describe('ActiveDirectoryResolver', () => {
  let resolver: ActiveDirectoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActiveDirectoryResolver],
    }).compile();

    resolver = module.get<ActiveDirectoryResolver>(ActiveDirectoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
