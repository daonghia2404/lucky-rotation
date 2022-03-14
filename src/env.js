const EValueType = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
};

const correctTypeValue = (value, type) => {
  if (value) {
    switch (type) {
      case EValueType.BOOLEAN:
      case EValueType.NUMBER:
        return JSON.parse(value);
      default:
        return value;
    }
  }
  return '';
};

const env = {
  siteName: correctTypeValue(process.env.REACT_APP_SITE_NAME),
  domain: correctTypeValue(process.env.REACT_APP_DOMAIN_NAME),
  rootUrl: correctTypeValue(process.env.REACT_APP_ROOT_URL),
  api: {
    baseUrl: {
      service: correctTypeValue(process.env.REACT_APP_SERVICE_BASE_URL),
    },
  },
  cookie: {
    domain: correctTypeValue(process.env.REACT_APP_COOKIE_DOMAIN),
  },
  dev: {},
};

export default env;
