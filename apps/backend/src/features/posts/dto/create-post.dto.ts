import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title!: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  published!: boolean;

  @IsInt()
  @IsOptional()
  authorId?: number;
}
