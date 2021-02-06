import Client from 'src/service/api/Client';
import notify from 'src/helper/notify';

export default class ProjectService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/projects';
  }

  async listItens(page) {
    const projectId = process.env.PROJECT_ID;
    return this.client.getAll(`${this.resourceUrl}/${projectId}/itens`, page);
  }

  async addUser(projectId, evaluatorId) {
    const form = { projectId, evaluatorId };
    const resp = await this.client.post(`${this.resourceUrl}/${projectId}/evaluators`, form);

    if (resp) {
      notify('positive', 'Login realizado com sucesso');
    }

    return resp;
  }
}
