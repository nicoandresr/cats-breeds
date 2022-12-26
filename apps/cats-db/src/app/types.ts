import { ApiProperty } from '@nestjs/swagger';

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


