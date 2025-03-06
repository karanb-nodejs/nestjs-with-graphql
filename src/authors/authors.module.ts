import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from './authors.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
  ],
  providers: [AuthorsResolver, AuthorsService],
})
export class AuthorsModule {}
