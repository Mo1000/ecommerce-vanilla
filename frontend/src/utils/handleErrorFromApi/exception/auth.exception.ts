import {ErrorApi} from "@/models/handleErrorApi/error-api.model.ts";

enum AuthExceptionCode {
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EMAIL_NOT_CONFIRMED = 'EMAIL_NOT_CONFIRMED',
}

export class AuthException {
  static emailExists() {
    return new ErrorApi(
      AuthExceptionCode.EMAIL_EXISTS,
      400,
    );
  }

  static invalidCredentials() {
    return new ErrorApi(
      AuthExceptionCode.INVALID_CREDENTIALS,
      400,
    );
  }
  static emailNotConfirmed() {
    return new ErrorApi(
      AuthExceptionCode.EMAIL_NOT_CONFIRMED,
      400,
    );
  }
}
