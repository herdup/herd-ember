import Ember from 'ember';
import layout from '../templates/components/herd-asset';
import pixel from 'herd-ember/lib/pixel';

const {
  get,
  set,
  computed,
  Component
} = Ember;

export default Component.extend({
  classNames: ['herd-asset'],
  classNameBindings: ['asset.assetClass', 'backgroundImage', 'imageContainer', 'lifecycle'],
  layout: layout,
  lifecycle: 'loading',

  attributeBindings: ['escapedStyle:style'],

  escapedStyle: computed('style', function() {
    return Ember.String.htmlSafe(get(this, 'style'));
  }),
  
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

  actions: {
    didLoad() {
      set(this, 'lifecycle', 'loaded');
    },
    becomeError() {
      set(this, 'lifecycle', 'errored');
    }
  },

  asset: computed('assetable.isFulfilled', 'assetable.assets.length', 'assetable.missingAssets.length', function() {
    let assetable = get(this, 'assetable');
    if (!assetable) { return null; }

    let thennable = typeof(assetable.then) === "function";

    if (thennable) {
      if (assetable.get('isFulfilled')) {
        return assetable.get('content').assetForTransform();
      } else {
        return null;
      }
    } else {
      return assetable.assetForTransform();
    }
  }),

  assetUrl: computed('asset', function() {
    let asset = get(this, 'asset');

    if (asset) {
      return asset.get('absoluteUrl');
    } else {
      return pixel;
    }
  })
});
