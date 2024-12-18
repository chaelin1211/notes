export default class ApiResponse {
  success: boolean;
  data: any;
  errorMsg: string;

  constructor(success: boolean, result: any = null) {
    this.success = success;
    if (success) {
      this.data = result;
    } else {
      this.errorMsg = result;
    }
  }
}