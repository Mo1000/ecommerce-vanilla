export interface ResponseSuccessApiModel<Type> {
  statusCode: number;
  data: Type;
}

export interface DumbFormattedResponse<Type> {
  success: boolean;
  data: Type;
  nameError?: string;
}

//Default response for all api calls and data is any ,because of error return.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormattedResponse<Type = any> = DumbFormattedResponse<Type>;
