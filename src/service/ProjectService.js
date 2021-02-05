import Client from 'src/service/api/Client';

export default class ProjectService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/projects';
  }

  async listItens(page) {
    const projectId = process.env.PROJECT_ID;
    return this.client.getAll(`${this.resourceUrl}/${projectId}/itens`, page);
  }
}
