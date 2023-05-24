import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createAssetResponse {
  @ApiProperty()
  @IsNumber()
  user: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  assetId: string;
}
