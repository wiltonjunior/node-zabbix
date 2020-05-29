'use strict';

const HttpController = require('../../../../commons/controllers/http.controller');

class UserController extends HttpController {
  constructor() {
    super();
    this.ZabbixService = require('../../../../commons/services/zabbix.service');
  }

  async getParams({ body }, res, next) {
    const { zabbix, params, service } = body;
    const api = new this.ZabbixService(zabbix);
    const Response = await api.get(service, params);
    this._sendResponse(res, next, Response);
  }
}

module.exports = new UserController();
