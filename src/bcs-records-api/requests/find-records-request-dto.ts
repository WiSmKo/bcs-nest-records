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
}