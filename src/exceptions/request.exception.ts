import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { EErrorCode, IError } from '@resources';

@Catch()
export class RequestExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(RequestExceptionFilter.name);
  private readonly httpToErrorCodeMap: Partial<Record<HttpStatus, EErrorCode>> =
    {
      [HttpStatus.BAD_REQUEST]: EErrorCode.BAD_REQUEST,
      [HttpStatus.UNAUTHORIZED]: EErrorCode.UNAUTHORIZED,
      [HttpStatus.FORBIDDEN]: EErrorCode.FORBIDDEN,
      [HttpStatus.NOT_FOUND]: EErrorCode.NOT_FOUND,
      [HttpStatus.INTERNAL_SERVER_ERROR]: EErrorCode.INTERNAL_SERVER_ERROR,
      [HttpStatus.UNPROCESSABLE_ENTITY]: EErrorCode.UNPROCESSABLE_ENTITY,
    };

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();

    const status: HttpStatus =
      exception.status || HttpStatus.INTERNAL_SERVER_ERROR;

    const error: IError = this.parseHttpError(exception, status);

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logInternalErrors(request, error, exception);
    }

    return response.status(status).json(error);
  }

  private parseHttpError(error: any, statusCode: HttpStatus): IError {
    const code: EErrorCode =
      error.code ||
      this.httpToErrorCodeMap[statusCode] ||
      EErrorCode.INTERNAL_SERVER_ERROR;

    return {
      code,
      message: error.message || 'Internal server error.',
      errors: error.errors,
    };
  }

  private logInternalErrors(
    request: Request,
    error: IError,
    exception: Error,
  ): void {
    const requestUrlLog = `[${request.method}] ${request.url}`;

    const requestBody = `[BODY]: ${JSON.stringify(request.body)}`;
    const requestQuery = `[QUERY]: ${JSON.stringify(request.query)}`;

    this.logger.error(
      `Internal server error occurred on ${requestUrlLog}: \n${requestBody}\n${requestQuery}\n[RESPONSE] ${JSON.stringify(
        error,
      )}`,
      exception.stack,
    );
  }
}
