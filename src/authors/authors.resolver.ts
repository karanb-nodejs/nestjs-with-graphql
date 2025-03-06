import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import {
  Author,
  CreateAuthorInput,
  FindAuthorInput,
  UpdateAuthorInput,
} from './authors.schema';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query(() => [Author], { name: 'authors' })
  async getAllAuthors(
    // @Args('params', { type: () => FindAuthorInput }) params: FindAuthorInput,
  ): Promise<Author[]> {
    return this.authorsService.getAllAuthors();
  }

  @Query(() => Author, { name: 'author' })
  async findAuthorById(
    @Args('params') { _id }: FindAuthorInput,
  ): Promise<Author | void> {
    if (!_id) {
      throw new Error('Author ID is required');
    }
    return await this.authorsService.findAuthorsById(_id);
  }

  /**  
    The mutation decorator marks this method as a GraphQL mutation that returns an 
    Author type. It is used to define a mutation operation for creating a new author.
  */
  @Mutation(() => Author)
  async createAuthor(@Args('params') author: CreateAuthorInput) {
    return this.authorsService.createAuthor(author);
  }

  @Mutation(() => Author)
  async updateAuthor(
    @Args('id') id: string,
    @Args('params') author: UpdateAuthorInput,
  ) {
    return this.authorsService.updateAuthor(id, author);
  }

  @Mutation(() => Author)
  async deleteAuthor(@Args('id') id: string) {
    return this.authorsService.deleteAuthor(id);
  }
}
