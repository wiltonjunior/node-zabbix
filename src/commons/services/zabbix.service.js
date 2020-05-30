"use strict";

const PropertyUtils = require("../utils/property.utils");

class ZabbixService {
  constructor({ url, user, password, options }) {
    this.url = url;
    this.user = user;
    this.auth = null;
    this.password = password;
    this.options = options || {};
  }

  _normalizeItems(param, element) {
    let array = [];
    if (PropertyUtils.isArray(element)) {
      array = element.map((item) => {
        const object = {};
        for (const key in item) {
          if (typeof item[key] !== "string" || param.includes(key)) {
            object[key] = item[key];
          }
        }
        return object;
      });
    }
    return array;
  }

  _normalize({ output, ...params }, response) {
    return response.map((item) => {
      const object = {};
      for (const key in item) {
        if (output.includes(key) || PropertyUtils.isObject(item[key])) {
          object[key] = item[key];
        } else if (PropertyUtils.isArray(item[key])) {
          for (const param in params) {
            if (
              String(param).toLowerCase().includes(String(key).toLowerCase())
            ) {
              object[key] = this._normalizeItems(params[param], item[key]);
            }
          }
        }
      }
      return object;
    });
  }

  async http({ body, method = "post" }) {
    try {
      const response = await fetch(this.url, {
        method: method,
        body: {
          jsonrpc: "2.0",
          auth: this.auth,
          ...body,
        },
      });
      return await response.json();
    } catch (error) {
      throw JSON.stringify(error);
    }
  }

  async api(callBack) {
    try {
      await this.login();
      const response = await callBack();
      this.logout();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async get(service, params) {
    try {
      const body = {
        method: `${service}.get`,
        params: params,
      };
      const response = await this.api(async () => await this.http({ body }));
      return this._normalize(params, response);
    } catch (error) {
      console.log(error);
    }
  }

  async login() {
    try {
      const body = {
        method: "user.login",
        params: {
          user: this.user,
          password: this.password,
        },
      };
      const result = await this.http({ body });
      this.auth = result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      const body = {
        method: "user.logout",
      };
      const result = await this.http({ body });
      this.auth = null;
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ZabbixService;
