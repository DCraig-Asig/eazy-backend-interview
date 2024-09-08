import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping(): string {
    return 'EazyInsure - SERVICE_NAME Service';
  }
}
