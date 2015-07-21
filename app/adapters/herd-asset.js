import config from '../config/environment';
import Ember from 'ember';
import DS from 'ember-data';

const {
  get
} = Ember;

const herdConfig = config['herd'] || {};

export default DS[herdConfig.adapter].extend({
  herdConfig: herdConfig,

  init() {
    let config    = get(this, 'herdConfig');
    let host      = config.host;
    let namespace = 'herd';

    if (config.namespace) {
      namespace = [config.namespace, namespace].join('/');
    }

    if (!config.host) {
      let applicationAdapter = this.container.lookup('adapter:application');
      if (applicationAdapter) {
        host = applicationAdapter.host
      }
    }
    
    this.setProperties({
      host: host,
      namespace: namespace
    });
  },

  buildURL() {
    let url = this._super(...arguments);
    return url.replace('herd-assets', 'assets');
  }
});
