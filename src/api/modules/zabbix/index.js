'use strict';

const BaseRouter = require('../../../commons/router/base.router');

class ZabbixRouter extends BaseRouter {
  constructor() {
    super();
    this.controller = require('./controllers/zabbix.controller');
  }
  initialize() {
    this.post('/', this.controller.getParams);
  }
}

module.exports = new ZabbixRouter().getRouter();
