import axios from 'axios';

export default class AuthClient {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async execute(authForm) {
    const resp = await this.client.post('auth', authForm);
    if (resp.data.token) return resp.data.token;
    throw new Error();
  }
}
