import { Injectable } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';

@Injectable()
export class ExchangeRateService {
  private readonly xmlParser = new XMLParser({
    ignoreAttributes: false,
    ignoreDeclaration: true,
    attributeNamePrefix: '',
    transformTagName: (tag) => tag.charAt(0).toLowerCase() + tag.slice(1),
    transformAttributeName: (attr) =>
      attr.charAt(0).toLowerCase() + attr.slice(1),
    textNodeName: 'value',
  });
}
