import Ember from 'ember';
import layout from '../templates/components/herd-uploader';

const {
  Component
} = Ember;

/**
  @class HerdUploader
  @module herd-ember/components/herd-uploader
  @extends Ember.Component
*/
export default Component.extend({
  layout: layout,

  allowMultipleAssets: false,
  classNames: ['herd-uploader'],
  assetUploading: false,
  previewStyle: '',

  actions: {
    pickImage() {
      this.$().find('input')[0].click();
    },
    herdAssetDidStartUploading(file, promise) {
      /* Show Spinner */
      this.set('assetUploading', true);
      
      /* Show Preview */
      let reader = new FileReader();
      reader.onload = e => {
        this.set('previewStyle', `background-image: url(${e.target.result})`);
      };
      reader.readAsDataURL(file);

      /* Handle Outcome */
      promise.finally(() => {
        this.set('assetUploading', false);
        this.set('previewStyle', '');
      });
    },
  }
});
