import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatDto } from './dto/cat.dto';

@Resolver()
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [CatDto])
  async cats() {
    return this.catsService.findAll();
  }

  @Mutation(() => CatDto)
  async createCat(@Args('input') input: CreateCatDto) {
    return this.catsService.create(input);
  }
}
