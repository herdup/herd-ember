import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import HerdUploader from 'herd-ember/lib/herd-uploader';
import HasAssetable from 'herd-ember/mixins/has-assetable';

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
export default FileField.extend(HasAssetable, {
  assetable: null,
  loadingAction: 'herdAssetDidStartUploading',

  filesDidChange(files) {
    if (isEmpty(files)) { return; }
    this.resolveAssetableThen(assetable => { this._startUpload(assetable, files); });
  },

  _startUpload(assetable, files) {
    let adapter = get(this, 'container').lookup('adapter:herd-asset');
    
    let uploader = HerdUploader.create({
      url: adapter.buildURL('herd-asset')
    });

    let data = {
      assetable_type: capitalize(assetable.get('constructor.modelName')),
    };
    
    let assetableSlug = get(assetable, 'assetableSlug');
    if (assetableSlug) {
      data['assetable_slug'] = assetable.get(assetableSlug);
    } else {
      data['assetable_id'] = assetable.get('id');
    }

    this.sendAction('loadingAction', files[0], uploader.upload(files[0], data));
  }
});
