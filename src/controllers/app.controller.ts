import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { AppService } from '@services';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  @ApiOperation({ summary: 'Ping Service' })
  @ApiOkResponse({ type: String })
  ping(): string {
    return this.appService.ping();
  }
}
