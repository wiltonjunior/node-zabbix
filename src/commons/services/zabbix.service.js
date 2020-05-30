'use strict'

const axios = require('axios')
const PropertyUtils = require('../utils/property.utils')

class ZabbixService {
  constructor({ url, user, password, options }) {
    this.url = url
    this.user = user
    this.auth = null
    this.password = password
    this.options = options || {}
  }

  _normalizeItems(param, element) {
    let array = []
    if (PropertyUtils.isArray(element)) {
      array = element.map((item) => {
        const object = {}
        for (const key in item) {
          if (typeof item[key] !== 'string' || param.includes(key)) {
            object[key] = item[key]
          }
        }
        return object
      })
    }
    return array
  }

  _normalize({ output, ...params }, response) {
    return response.map((item) => {
      const object = {}
      for (const key in item) {
        if (output.includes(key) || PropertyUtils.isObject(item[key])) {
          object[key] = item[key]
        } else if (PropertyUtils.isArray(item[key])) {
          for (const param in params) {
            if (String(param).toLowerCase().includes(String(key).toLowerCase())) {
              object[key] = this._normalizeItems(params[param], item[key])
            }
          }
        }
      }
      return object
    })
  }

  async request({ data, method = 'post' }) {
    try {
      const response =
        (await axios({
          method,
          url: this.url,
          data: {
            id: 1,
            ...data,
            jsonrpc: '2.0',
            auth: this.auth,
          },
        })) || {}
      return response.data
    } catch (error) {
      throw JSON.stringify(error)
    }
  }

  async authentication(callBack) {
    try {
      await this.login()
      const response = await callBack()
      this.logout()
      return response
    } catch (error) {
      console.error(error)
    }
  }

  async get(service, params) {
    try {
      const data = {
        params: params,
        method: `${service}.get`,
      }
      const response = await this.authentication(async () => await this.request({ data }))
      return this._normalize(params, response)
    } catch (error) {
      console.log(error)
    }
  }

  async login() {
    try {
      const data = {
        method: 'user.login',
        params: {
          user: this.user,
          password: this.password,
        },
      }
      const response = await this.request({ data })
      this.auth = response.result
      return response
    } catch (error) {
      throw error
    }
  }

  async logout() {
    try {
      const data = {
        method: 'user.logout',
      }
      const result = await this.request({ data })
      this.auth = null
      return result
    } catch (error) {
      throw error
    }
  }

  async version() {
    try {
      const data = {
        method: 'apiinfo.version',
        params: []
      }
      const result = await this.request({ data })
      this.auth = null
      return result
    } catch (error) {
      throw error
    }
  }
}

module.exports = ZabbixService
