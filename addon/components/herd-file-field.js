import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import HerdUploader from 'herd-ember/lib/herd-uploader';

const {
  get,
  isEmpty
} = Ember;

const {
  capitalize
} = Ember.String;

const {
  FileField
} = EmberUploader;

/**
  @class HerdFileField
  @module herd-ember/components/herd-file-field
  @extends Ember.Component
*/
export default FileField.extend({
  assetable: null,
  loadingAction: 'herdAssetDidStartUploading',

  filesDidChange(files) {
    let assetable = get(this, 'assetable');

    if (assetable) {
      let adapter = get(this, 'container').lookup('adapter:herd-asset');
      
      let uploader = HerdUploader.create({
        url: adapter.buildURL('herd-asset')
      });

      if (!isEmpty(files)) {
        let promise = uploader.upload(files[0], {
          assetable_type: capitalize(assetable.get('constructor.modelName')),
          assetable_id:   assetable.get('id')
        });

        if (get(this, 'loadingAction')) {
          this.sendAction('loadingAction', files[0], promise);
        }

        promise.then(data => {
          let newAsset = assetable.store.push(data);
          get(assetable, 'assets').pushObject(newAsset);
        });
      }
    } else {
      throw new Error('Herd Ember: You can not upload a file unless assetable is defined');
    }
  }
});
