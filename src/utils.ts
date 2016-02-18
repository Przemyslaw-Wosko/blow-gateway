export function removeProperties(properties: string[]) {
  return obj => {
    properties.forEach(property => {
      delete obj[property];
    });
    return obj;
  };
}