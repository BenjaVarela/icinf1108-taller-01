export class ApiResponse<T> {
  success!: boolean;
  statusCode!: number;
  message!: string;
  data!: T | null;
  errors!: any | null;
  timestamp!: string;

  static success<T>(
    data: T,
    message = 'Operation completed successfully',
    statusCode = 200,
  ): ApiResponse<T> {
    return {
      success: true,
      statusCode,
      message,
      data,
      errors: null,
      timestamp: new Date().toISOString(),
    };
  }

  static error(
    message: string,
    statusCode = 400,
    errors: any = null,
  ): ApiResponse<null> {
    return {
      success: false,
      statusCode,
      message,
      data: null,
      errors,
      timestamp: new Date().toISOString(),
    };
  }
}