import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import getConfig from '@config';
import { RequestExceptionFilter } from '@exceptions';
import { EErrorCode } from '@resources';
import { formatErrors } from '@utilities';

import { AppModule } from './app.module';

(async () => {
  const config = getConfig();

  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: true, credentials: true });

  app.use(helmet.contentSecurityPolicy());
  app.use(helmet.crossOriginEmbedderPolicy());
  app.use(helmet.crossOriginOpenerPolicy());
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.originAgentCluster());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy());
  app.use(
    helmet.strictTransportSecurity({
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    }),
  );
  app.use(helmet.xFrameOptions({ action: 'sameorigin' }));
  app.use(helmet.xssFilter());

  app.useGlobalFilters(new RequestExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 422,
      exceptionFactory: (errors) => ({
        code: EErrorCode.VALIDATION_ERROR,
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Validation error',
        errors: formatErrors(errors),
      }),
    }),
  );

  await app.listen(config.port);

  const appUrl = await app.getUrl();

  Logger.log(`🚀 Eazy Backend Interview service is running on: ${appUrl}`);
})();
