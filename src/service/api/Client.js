import axios from 'axios';
import jwt from 'jsonwebtoken';
import Vue from 'vue';
import handleErrorResponse from 'src/utils/handleErrorResponse';
import AuthService from '../AuthService';

export default class Client {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(async (config) => {
      try {
        const sessionToken = Vue.$cookies.get('sessionToken');
        jwt.verify(sessionToken, Buffer.from(process.env.JWT_SIGNATURE, 'base64'), { algorithms: ['HS256'] });
        config.headers.Authorization = `Bearer ${sessionToken}`;
        return config;
      } catch (e) {
        const authService = new AuthService();
        await authService.generateApiToken();
        return config;
      }
    });
  }

  async getAll(resourceUrl, page = 0) {
    try {
      const resp = await this.client.get(`${resourceUrl}?page=${page}`);
      return resp.data;
    } catch (e) {
      handleErrorResponse(e.response.data);
      return null;
    }
  }

  async get(resourceUrl, id) {
    try {
      const resp = await this.client.get(`${resourceUrl}/${id}`);
      return resp.data;
    } catch (e) {
      handleErrorResponse(e.response.data);
      return null;
    }
  }

  async post(resourceUrl, resource) {
    try {
      const resp = await this.client.post(resourceUrl, resource);
      return resp.data;
    } catch (e) {
      handleErrorResponse(e.response.data);
      return null;
    }
  }

  async getWithoutError(resourceUrl, id) {
    try {
      const resp = await this.client.get(`${resourceUrl}/${id}`);
      return resp.data;
    } catch (e) {
      return null;
    }
  }

  async postWithoutError(resourceUrl, resource) {
    try {
      const resp = await this.client.post(resourceUrl, resource);
      return resp.data;
    } catch (e) {
      return null;
    }
  }

  async put(resourceUrl, id, resource) {
    try {
      const resp = await this.client.put(`${resourceUrl}/${id}`, resource);
      return resp.data;
    } catch (e) {
      handleErrorResponse(e.response.data);
      return null;
    }
  }

  async delete(resourceUrl, id) {
    try {
      await this.client.delete(`${resourceUrl}/${id}`);
      return true;
    } catch (e) {
      handleErrorResponse(e.response.data);
      return null;
    }
  }
}
