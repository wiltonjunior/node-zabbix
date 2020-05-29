'use strict';

const PropertyUtils = require('../utils/property.utils');

class ZabbixService {
  constructor({ Url, User, Password }) {
    const Zabbix = require('zabbix-promise');
    this.zabbix = new Zabbix({
      url: Url,
      user: User,
      password: Password
    });
  }

  _normalizeItems(param, element) {
    let array = [];
    if (PropertyUtils.isArray(element)) {
      array = element.map(item => {
        const object = {};
        for (const key in item) {
          if (typeof item[key] !== 'string' || param.includes(key)) {
            object[key] = item[key];
          }
        }
        return object;
      });
    }
    return array;
  }

  _normalize({ output, ...params }, response) {
    return response.map(item => {
      const object = {};
      for (const key in item) {
        if (output.includes(key) || PropertyUtils.isObject(item[key])) {
          object[key] = item[key];
        } else if (PropertyUtils.isArray(item[key])) {
          for (const param in params) {
            if (String(param).toLowerCase().includes(String(key).toLowerCase())) {
              object[key] = this._normalizeItems(params[param], item[key]);
            }
          }
        }
      }
      return object;
    });
  }

  async api(callBack) {
    try {
      await this.zabbix.login();
      const Response = await callBack();
      this.zabbix.logout();
      return Response;
    } catch (error) {
      console.error(error);
    }
  }

  async get(service, params) {
    try {
      const response = await this.api(() => this.zabbix.request(`${service}.get`, params));
      return this._normalize(params, response);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ZabbixService;
