export const settings = {
  enabled: true,
  secret: 'SUPERDUPERSECRETx666',
  tokenTTL: 3600,
  excludeRoutesRule: ({request}) => {
    if (request.path.startsWith('/auth') && request.isPost) {
      return true;
    } else if (request.path.startsWith('/users') && request.isPost) {
      return true;
    }
  }
};