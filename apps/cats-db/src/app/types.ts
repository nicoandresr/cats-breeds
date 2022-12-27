import { ApiProperty } from '@nestjs/swagger';

export class QueryCatsDTO {
  @ApiProperty({ type: Number, nullable: true, description: 'number of cats to skip the query', default: 0})
  skip: number | null

  @ApiProperty({ type: Number, nullable: true, description: 'number of cats to take from the query', default: 10})
  take: number | null
}

export class CatResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  breed: string;

  @ApiProperty()
  group: string;

  @ApiProperty()
  weight: string;
}

export class CreateCat {
  @ApiProperty()
  name: string;

  @ApiProperty()
  breed: string;

  @ApiProperty()
  group: string;

  @ApiProperty()
  weight: string;
}
