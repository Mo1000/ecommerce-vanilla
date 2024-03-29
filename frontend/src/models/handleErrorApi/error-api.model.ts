export class ErrorApi {
  code: string;
  message?: string;

  constructor(code: string, message?: string) {
    this.code = code;
    this.message = message;
  }
}

export interface ResponseErrorAPi {
  statusCode: number;
  data: string[];
  error: {
    code: string;
    message: string;
  };
  meta: {
    timestamp: string;
    path: string;
  };
}
