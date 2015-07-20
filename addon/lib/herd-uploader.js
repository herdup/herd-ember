import EmberUploader from 'ember-uploader';

const {
  Uploader 
} = EmberUploader;

/**
  @class HerdUploader
  @module herd-ember/lib/herd-uploader
  @extends EmberUploader.Uploader
*/
export default Uploader.extend({
  paramNamespace: 'asset',

  ajaxSettings() {
    let settings = this._super(...arguments);

    settings.headers = {
      'Accept': 'application/json'
    };

    return settings; 
  }
});
