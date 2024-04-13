import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseSearchValidationPipe implements PipeTransform<any> {
    transform(value: any, metadata: ArgumentMetadata) {
        const { artist, title, catno } = value;

        if (            
            (!artist || (typeof artist === 'string' && artist.trim() === '')) &&
            (!title || (typeof title === 'string' && title.trim() === '')) &&
            (!catno || (typeof catno === 'string' && catno.trim() === '')))
        {
            throw new BadRequestException('At least one of artist, title or catno properties must not be null');
        }

        return value;
    }
}