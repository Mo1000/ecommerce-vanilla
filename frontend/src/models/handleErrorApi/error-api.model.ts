export class ErrorApi {
  code: string;
  statusCode?: number;

  constructor(code: string, statusCode?: number) {
    this.code = code;
    this.statusCode = statusCode;
  }
}

export interface ResponseErrorAPi {
  statusCode: number;
  data: string[];
  error: {
    code: string;
    statusCode: number;
  };
  meta: {
    timestamp: string;
    path: string;
  };
}
