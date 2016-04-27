import Ember from 'ember';
import layout from '../templates/components/herd-asset';
import pixel from 'herd-ember/lib/pixel';
import BindsStyle from 'herd-ember/mixins/binds-style';

const {
  get,
  set,
  computed,
  Component
} = Ember;

export default Component.extend(BindsStyle, {
  classNames: ['herd-asset'],
  classNameBindings: ['asset.assetClass', 'backgroundImage', 'imageContainer', 'lifecycle'],
  layout: layout,
  lifecycle: 'loading',
  pixel: pixel,

  // Image Options
  backgroundImage: false,
  imageContainer: false,
  width: null,
  height: null,
  alt: "",

  assetComponent: computed('backgroundImage', 'imageContainer', 'asset.assetClass', function() {
    if (get(this, 'asset')) {
      let assetClass = get(this, 'asset.assetClass');
      if (assetClass === 'image') {
        if (get(this, 'backgroundImage')) { return 'background-image'; }
        if (get(this, 'imageContainer'))  { return 'image-container'; }
        return 'stateful-img'; 
      }
      throw new Ember.Error(`Herd Ember does not support an asset class of ${assetClass}.`);
    }
  }),

  actions: {
    didLoad() { set(this, 'lifecycle', 'loaded'); },
    becameError() { set(this, 'lifecycle', 'errored'); }
  },

  asset: computed('assetable.isFulfilled', 'assetable.assets.length', 'assetable.missingAssets.length', function() {
    let assetable = get(this, 'assetable');
    if (!assetable) { return null; }

    if (typeof assetable.then === "function") {
      if (assetable.get('isFulfilled')) { return assetable.get('content').assetForTransform(); }
      return null;
    }

    return assetable.assetForTransform();
  }),

  assetUrl: computed('asset', function() {
    let asset = get(this, 'asset');
    if (asset) { return asset.get('absoluteUrl'); }

    return pixel;
  })
});
