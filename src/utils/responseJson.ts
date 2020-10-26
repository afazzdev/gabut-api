/* eslint-disable @typescript-eslint/no-empty-interface */
export enum Status {
  success = 'success',
  fail = 'fail',
  error = 'error',
}

export interface BaseResponse<T = any> {
  status: Status;
  data: T;
  message: string;
}
