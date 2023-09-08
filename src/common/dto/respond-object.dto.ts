export class ResponseObject<T> {
  success: boolean;
  data: T;
  message: string;

  static success<T>(data: T, message: string = null): ResponseObject<T> {
    return {
      success: true,
      data: data,
      message,
    };
  }

  static fail<T>(data: T, message: string): ResponseObject<T> {
    return {
      success: false,
      data: data,
      message: message,
    };
  }

  static error<T>(data: T, message: string): ResponseObject<T> {
    return {
      success: false,
      data: data,
      message: message,
    };
  }
}
