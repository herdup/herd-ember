import Ember from 'ember';
import DS from 'ember-data';
import layout from '../templates/components/herd-asset';
import pixel from 'herd-ember/lib/pixel';

const {
  get,
  computed,
  Component
} = Ember;

export default Component.extend({
  classNames: ['herd-asset'],
  classNameBindings: ['asset.assetClass', 'backgroundImage', 'imageContainer'],
  layout: layout,

  // Image Options
  backgroundImage: false,
  imageContainer: false,
  width: null,
  height: null,
  alt: "",

  assetComponent: computed('backgroundImage', 'imageContainer', 'asset.assetClass', function() {
    let assetClass = get(this, 'asset.assetClass');

    if (assetClass === 'image') {
      if (get(this, 'backgroundImage')) {
        return 'background-image';
      } else if (get(this, 'imageContainer')) {
        return 'image-container';
      } else {
        return 'stateful-img'; 
      }
    }
  }),

  asset: computed('assetable.currentState', function() {
    let assetable = get(this, 'assetable');
    
    if (assetable) {
      if (assetable instanceof DS.Model) {
        if (assetable.get('isLoading')) {
          return null; 
        } else {
          return assetable.assetForTransform() || pixel;
        }
      } else {
        // Assume Promise Object
        if (assetable.get('isPending')) {
          return null; 
        } else {
          return assetable.get('content').assetForTransform() || pixel;
        }
      }
    } else {
      return null; 
    }
  }),

  assetUrl: computed('asset.id', function() {
    let asset = get(this, 'asset');
    if (asset) {
      return asset.get('absoluteUrl');
    } else {
      return pixel;
    }
  })
});
