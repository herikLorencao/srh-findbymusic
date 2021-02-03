import Client from 'src/service/api/Client';

export default class UserService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/users/evaluators';
  }

  async find(id) {
    return this.client.get(this.resourceUrl, id);
  }

  async list() {
    return this.client.getAll(this.resourceUrl);
  }
}
