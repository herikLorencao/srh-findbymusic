import Client from 'src/service/api/Client';

export default class LoginService {
  constructor() {
    this.client = new Client();
    this.resourcePath = '/admins/login';
  }

  async login(loginForm) {
    return this.client.post(this.resourcePath, loginForm);
  }
}
