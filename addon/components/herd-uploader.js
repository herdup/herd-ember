import Ember from 'ember';
import layout from '../templates/components/herd-uploader';
import HasAssetable from 'herd-ember/mixins/has-assetable';
import pixel from 'herd-ember/lib/pixel';

const {
  get,
  set,
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
export default Component.extend(HasAssetable, {
  layout: layout,
  onSuccess: null,
  onError: null,
  pixel: pixel,
  classNames: ['herd-uploader'],
  
  classNameBindings: ['isUploading', 'allowMultipleAssets'],
  allowMultipleAssets: false,
  isUploading: false,
  previewData: null,

  previewStyle: computed('previewData', 'assetable.assets.firstObject', function() {
    let previewData = get(this, 'previewData'),
        url;
   
    if (previewData) {
      url = previewData;
    } else {
      if (get(this, 'allowMultipleAssets') || !get(this, 'assetable.assets.length')) {
        url = pixel; 
      } else {
        url = get(this, 'assetable.assets.firstObject.absoluteUrl');
      }
    }

    return new SafeString(`background-image: url(${url})`);
  }),

  actions: {
    pickImage() {
      this.$().find('input')[0].click();
    },

    herdAssetDidStartUploading(file, promise) {
      set(this, 'isUploading', true);
      this._readFileData(file);
      
      promise.then(data => {
        this.resolveAssetableThen(assetable => { this._handleUploadData(assetable, data); });
      })
      .catch(error => {
        if (get(this, 'onError')) { this.sendAction('onError', error); }
      })
      .finally(() => {
        set(this, 'isUploading', false);
        set(this, 'previewData', null);
      });
    }
  },

  _readFileData(file) {
    let _this = this;
    let reader = new FileReader();
    reader.onload = e => {
      set(_this, 'previewData', e.target.result);
    };
    reader.readAsDataURL(file);
  },

  _handleUploadData(assetable, data) {
    let newAsset = assetable.store.push(data);
    get(assetable, 'assets').pushObject(newAsset);
    
    if (!get(this, 'allowMultipleAssets')) {
      let promises = [];
      get(assetable, 'assets').without(newAsset).forEach(asset => { 
        promises.push(asset.destroyRecord()); 
      });
      RSVP.all(promises);
    }

    if (get(this, 'onSuccess')) { this.sendAction('onSuccess', newAsset); }
  }
});
