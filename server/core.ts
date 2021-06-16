import { Status } from './deps.ts';

type ErrorType = Error | LogicErrorCode;

export class Result<T = never> {
  public static success<T>(payload: T) {
    return new Result(payload, undefined);
  }

  public static error(error: ErrorType) {
    return new Result(undefined, error);
  }

  public get result() {
    return this;
  }

  public get response() {
    const { success, error } = this;
    if (error) {
      if (error instanceof Error) {
        const status = Status.InternalServerError;
        return { status, body: error };
      } else {
        const status = statusMap[error];
        return { status, body: error };
      }
    } else {
      return { body: success };
    }
  }

  private constructor(
    public readonly success?: T,
    public readonly error?: ErrorType,
  ) {
  }
}

export enum LogicErrorCode {
  NotFound = 'NotFound',
}

const statusMap = {
  [LogicErrorCode.NotFound]: Status.NotFound,
};
