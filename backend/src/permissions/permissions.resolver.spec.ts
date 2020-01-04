import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsResolver } from './permissions.resolver';

describe('PermissionsResolver', () => {
  let resolver: PermissionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionsResolver],
    }).compile();

    resolver = module.get<PermissionsResolver>(PermissionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
