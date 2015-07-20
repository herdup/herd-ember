'use strict';

module.exports = function(/* environment, appConfig */) {

  return {
    'herd': {
      host: null,
      namespace: null,
      adapter: 'JSONAPIAdapter'
    }
  };
};
