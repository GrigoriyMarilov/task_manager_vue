export class ApiError {
  public status: number;
  public errors?: { [key: string]: string };
  public message: string;

  constructor(
    status: number,
    message: string,
    errors?: { [key: string]: string },
  ) {
    this.status = status;
    this.errors = errors;
    this.message = message;
  }
}
