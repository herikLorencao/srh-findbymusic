import Client from 'src/service/api/Client';
import notify from 'src/helper/notify';

export default class ItemService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/itens';
  }

  async find(id) {
    return this.client.get(this.resourceUrl, id);
  }

  async list() {
    return this.client.getAll(this.resourceUrl);
  }

  async create(itemForm) {
    const resp = await this.client.post(this.resourceUrl, itemForm);

    if (resp) {
      notify('positive', 'Item criado com sucesso');
    }

    return resp;
  }

  async update(itemForm) {
    const resp = await this.client.put(this.resourceUrl, itemForm.id, itemForm);

    if (resp) {
      notify('positive', 'Item editado com sucesso');
    }
    return resp;
  }

  async remove(id) {
    const resp = await this.client.delete(this.resourceUrl, id);
    if (resp) {
      notify('positive', 'Item removido com sucesso');
    } else {
      notify('negative', 'Verifique se o item não esta sendo usado em um projeto');
    }
  }

  async listAttributes(itemId) {
    return this.client.getAll(`${this.resourceUrl}/${itemId}/attributes`);
  }
}
