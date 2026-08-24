import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  override catch(_exception: unknown, host: ArgumentsHost): void {
    let exception = _exception;
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      if (status >= 500) {
        this.logger.error(exception.message, exception.stack);
        exception = new HttpException(INTERNAL_SERVER_ERROR_MESSAGE, 500);
      } else {
        this.logger.warn(exception.message);
      }
    } else {
      const message = exception instanceof Error ? exception.message : String(exception);
      const stack = exception instanceof Error ? exception.stack : undefined;
      this.logger.error(message, stack);
      exception = new HttpException(INTERNAL_SERVER_ERROR_MESSAGE, 500);
    }

    super.catch(exception, host);
  }
}
