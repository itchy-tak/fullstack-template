import { IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsOptional()
  name?: string;
}
