import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

import { ErrorResponse } from './error.response';

export function DefaultErrorResponse() {
  return applyDecorators(
    ApiBadRequestResponse({
      type: ErrorResponse,
      description: 'BadRequest',
    }),
    ApiForbiddenResponse({
      type: ErrorResponse,
      description: 'Forbidden',
    }),
    ApiUnauthorizedResponse({
      type: ErrorResponse,
      description: 'Unauthorized',
    }),
    ApiNotFoundResponse({
      type: ErrorResponse,
      description: 'Not Found',
    }),
    ApiInternalServerErrorResponse({
      type: ErrorResponse,
      description: 'Internal Server Error',
    }),
  );
}
