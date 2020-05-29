'use strict';

class PropertyUtils {
  getValue(obj, path) {
    return path
      .replace(/\[(\w+)\]/g, '.$1')
      .replace(/^\./, '')
      .split('.')
      .reduce((acc, part) => acc && acc[part], obj);
  }

  setValue(obj = {}, path, value) {
    let i, array = path.replace(/^\./, '').split('.');
    for (i = 0; i < array.length - 1; i++) {
      if (!obj[array[i]]) obj[array[i]] = {};
      obj = obj[array[i]];
    }
    obj[array[i]] = value;
  }

  isObject(value) {
    return value && value.constructor === Object;
  }

  isArray(value) {
    return value && value.constructor === Array;
  }

  sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  updateArrayIndex(array, index, value) {
    array[index] = value;
  }

  monthQueryPath(name, value) {
    let object = {};
    for (let key in value) {
      if (value[key]) {
        object[`${name}.${key}`] = value[key];
      }
    }
    return object;
  }

  setParams(url, others) {
    let params = '?';
    for (const key in others) {
      if (others[key]) {
        params = `${params}${key}=${others[key]}&`;
      }
    }
    params = params.substring(0, params.length - 1);
    return `${url}${params}`
  }

}

module.exports = new PropertyUtils();
