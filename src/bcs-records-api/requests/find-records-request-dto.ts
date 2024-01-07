import { IsOptional, IsString, IsNumberString, Length} from 'class-validator'

export class FindRecordsDto {

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    artist: string;

    @IsNumberString()
    @IsOptional()
    @Length(4,4)
    year: string; 

    @IsString()
    @IsOptional()
    label: string;

    @IsString()
    @IsOptional()
    country: string;

    @IsNumberString()
    @IsOptional()
    page: string;

    @IsNumberString()
    @IsOptional()
    per_page: string; 
}