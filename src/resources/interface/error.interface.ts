import { EErrorCode } from '../enum';

export interface IError {
  code: EErrorCode;
  message: string;
  errors?: Record<string, string>;
}
