import Ember from 'ember';
import layout from '../templates/components/herd-uploader';

const {
  get,
  set,
  run,
  computed,
  Component,
  RSVP
} = Ember;

const {
  SafeString
} = Ember.Handlebars;

/**
  @class HerdUploader
  @module herd-ember/components/herd-uploader
  @extends Ember.Component
*/
export default Component.extend({
  layout: layout,
  onSuccess: null,
  onError: null,

  allowMultipleAssets: false,
  classNames: ['herd-uploader'],
  classNameBindings: ['isUploading', 'allowMultipleAssets'],
  isUploading: false,
  pixelData: new SafeString("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),
  previewData: null,

  previewStyle: computed('previewData', 'assetable.assets.firstObject', function() {
    let previewData = get(this, 'previewData'),
        pixelData = get(this, 'pixelData'),
        url;
    
    if (previewData) {
      url = previewData;
    } else {
      if (get(this, 'allowMultipleAssets') || !get(this, 'assetable.assets.length')) {
        url = pixelData; 
      } else {
        url = get(this, 'assetable.assets.firstObject.absoluteUrl');
      }
    }

    return new SafeString(`background-image: url(${url})`);
  }),

  // Lifecycle Hook
  herdAssetDidUpload(data) {
    if (!get(this, 'allowMultipleAssets')) {
      this._deleteOldAssetsFor(data);
    }

    if (get(this, 'onSuccess')) {
      this.sendAction('onSuccess', data);
    }
  },

  herdAssetUploadFailed(error) {
    if (get(this, 'onError')) {
      this.sendAction('onError', error);
    }
  },

  actions: {
    pickImage() {
      this.$().find('input')[0].click();
    },
    herdAssetDidStartUploading(file, promise) {
      /* Show Spinner */
      set(this, 'isUploading', true);
      
      /* Show Preview */
      let reader = new FileReader();
      reader.onload = e => {
        set(this, 'previewData', e.target.result);
      };
      reader.readAsDataURL(file);

      promise.then(data => {
        run.scheduleOnce('afterRender', this, 'herdAssetDidUpload', data);
      });
      
      promise.catch(error => {
        run.scheduleOnce('afterRender', this, 'herdAssetUploadFailed', error);
      });

      /* Handle Outcome */
      promise.finally(() => {
        set(this, 'isUploading', false);
        set(this, 'previewData', null);
      });
    },
  },

  _deleteOldAssetsFor(payload) {
    // TODO - This assumes JSONAPI Format.
    let id = payload.data.id;

    let oldAssets = get(this, 'assetable.assets').rejectBy('id', id);
    let oldAssetPromises = [];
    
    for (let i = 0; i < oldAssets.length; i++) {
      oldAssetPromises.push(oldAssets[i].destroyRecord());
    }

    let promise = RSVP.all(oldAssetPromises);

    promise.catch(() => {
      throw new Error(`Herd Ember: Could not delete old assets after uploading Asset with id: ${id}`);
    });

    return promise;
  }
});
