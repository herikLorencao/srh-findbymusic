import Client from 'src/service/api/Client';
import notify from 'src/helper/notify';

export default class UserService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/users/evaluators';
  }

  async find(id) {
    return this.client.get(this.resourceUrl, id);
  }

  async create(apiForm) {
    const resp = await this.client.post(this.resourceUrl, apiForm);

    if (resp) {
      notify('positive', 'Usuário criado com sucesso');
    }

    return resp;
  }

  async update(userForm, isRemovedVerify = false) {
    const resp = await this.client.put(this.resourceUrl, userForm.id, userForm);

    if (resp && !isRemovedVerify) {
      notify('positive', 'Perfil editado com sucesso');
    }

    return resp;
  }

  async list() {
    return this.client.getAll(this.resourceUrl);
  }
}
