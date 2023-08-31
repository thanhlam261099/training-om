import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class TransformPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    return value;
  }
}
