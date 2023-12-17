import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistOrTitleRequiredPipe implements PipeTransform<any> {
    transform(value: any, metadata: ArgumentMetadata) {
        const { artist, title } = value;

        if ((artist === null || artist.trim() === '') && (title === null || title.trim() === '')){
            throw new BadRequestException('At least one of artist or title properties must not be null');
        }

        return value;
    }

}