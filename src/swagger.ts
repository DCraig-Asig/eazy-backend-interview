import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Axios } from 'axios';
import { capitalize, get } from 'lodash';
import * as OpenAPIConverter from 'openapi-to-postmanv2';

import getConfig from '@config';

export default async (app: INestApplication) => {
  const config = getConfig();
  const axios = new Axios();
  const logger = new Logger('Swagger');

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('SERVICE_NAME')
      .setVersion('1.0')
      .addBearerAuth()
      .build(),
  );

  logger.log('Swagger document created');

  SwaggerModule.setup('api', app, document);

  return OpenAPIConverter.convert(
    { type: 'string', data: JSON.stringify(document) },
    {},
    async (err, result) => {
      if (!result.result) {
        return null;
      }

      logger.log('Swagger document converted to Postman collection');

      const Collection = result.output[0].data;

      const PostmanDocumentation = {
        name: Collection.info.name,
        description:
          'API Collection for the SERVICE_NAME service. The SERVICE_NAME service is responsible for ...',
        item: (get(Collection.item[0], 'item') || []).map((requestInfo) => ({
          ...requestInfo,
          name: requestInfo.request
            ? requestInfo.name
            : capitalize(requestInfo.name),
          item: requestInfo.request
            ? undefined
            : requestInfo.item.reduce(
                (
                  acc: Record<string, unknown>[],
                  curr: Record<string, unknown>,
                ) => {
                  if (curr.item && Array.isArray(curr.item)) {
                    acc.push(...curr.item);
                  } else {
                    acc.push(curr);
                  }

                  return acc;
                },
                [],
              ),
        })),
      };

      try {
        await axios.request({
          method: 'POST',
          url: `${config.app.gatewayBaseUrl}/documentation-management/publish`,
          data: PostmanDocumentation,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        logger.log('Postman documentation published');
      } catch (error) {
        logger.error(
          'Failed to publish Postman documentation',
          (error as Error).stack,
        );
      }
    },
  );
};
