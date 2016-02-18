export function removeProperties(properties: string[]) {
  return obj => {
    properties.forEach(property => {
      delete obj[property];
    });
    return obj;
  };
}

export function copy(copyTo?: Object) {
  return obj => {
    return copyProperties(Object.keys(obj))(copyTo)(obj);
  };
}

export function copyProperties(properties: string[]) {
  return (copyTo?) => {
    return obj => {
      copyTo = copyTo || {};
      properties.forEach(property => {
        copyTo[property] = obj[property];
      });
      return copyTo;
    };
  }
}

export function setProperty(property: string) {
  return obj => {
    return value => {
      obj[property] = value;
      return obj;
    };
  };
}

export function setResponse(response) {
  return result => {
    if (result.status && result.body) {
      response.status.code = result.status;
      response.body = result.body;
    } else {
      response.body = result;
    }
  };
}

export const setBody = setProperty('body');
