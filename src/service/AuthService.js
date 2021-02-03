import Vue from 'vue';
import AuthClient from 'src/service/api/AuthClient';

export default class AuthService {
  constructor() {
    this.client = new AuthClient();
  }

  async generateApiToken() {
    const apiLoginForm = {
      login: process.env.API_USER,
      password: process.env.API_PASSWORD,
    };

    try {
      const token = await this.client.execute(apiLoginForm);
      Vue.$cookies.set('sessionToken', token);
    } catch (e) {
      // console.log('Mensagem');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  removeApiToken() {
    Vue.$cookies.remove('sessionToken');
  }
}
