import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../dto/api-response.dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    let message = 'An unexpected error occurred';
    if (typeof exceptionResponse === 'object' && exceptionResponse.message) {
      message = Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message[0]
        : exceptionResponse.message;
    } else if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    }

    const errors =
      typeof exceptionResponse === 'object'
        ? exceptionResponse.error || exceptionResponse
        : exception;

    response.status(status).json(ApiResponse.error(message, status, errors));
  }
}