import Client from 'src/service/api/Client';

export default class ItemRatingService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/itemratings';
  }

  async listByProject(page) {
    const projectId = process.env.PROJECT_ID;
    return this.client.getAll(`${this.resourceUrl}/projects/${projectId}`, page);
  }

  async listByEvaluator(evaluatorId, page) {
    return this.client.getAll(`${this.resourceUrl}/evaluators/${evaluatorId}`, page);
  }

  create(itemRatingForm) {
    return this.client.post(this.resourceUrl, itemRatingForm);
  }
}
