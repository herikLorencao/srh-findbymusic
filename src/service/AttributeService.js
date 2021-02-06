import Client from 'src/service/api/Client';
import notify from 'src/helper/notify';

export default class AttributeService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/attributes';
  }

  async find(id) {
    return this.client.get(this.resourceUrl, id);
  }

  async list(page) {
    return this.client.getAll(this.resourceUrl, page);
  }

  async create(attributeForm) {
    const resp = await this.client.post(this.resourceUrl, attributeForm);

    if (resp) {
      notify('positive', 'Atributo criado com sucesso');
    }

    return resp;
  }

  async update(attributeForm) {
    const resp = await this.client.put(this.resourceUrl, attributeForm.id, attributeForm);

    if (resp) {
      notify('positive', 'Atributo editado com sucesso');
    }
    return resp;
  }

  async remove(id) {
    const resp = await this.client.delete(this.resourceUrl, id);
    if (resp) notify('positive', 'Atributo removido com sucesso');
  }
}
