// import {
//   PipeTransform,
//   Injectable,
//   ArgumentMetadata,
//   BadRequestException,
// } from '@nestjs/common';
// import { validate } from 'class-validator';
// import { plainToInstance } from 'class-transformer';

// @Injectable()
// export class ValidationPipe implements PipeTransform<any> {
//   private toValidate(metatype: Function): boolean {
//     const types: Function[] = [String, Boolean, Number, Array, Object];
//     return !types.includes(metatype);
//   }
// }
