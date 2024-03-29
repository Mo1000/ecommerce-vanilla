export function transformeResponseApi<T>(
  success: boolean,
  data: T,
  nameError: string | undefined = undefined,
) {
  return {
    nameError,
    success,
    data,
  };
}
