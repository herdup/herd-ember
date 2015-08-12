import Ember from 'ember';
import DS from 'ember-data';

const {
  get,
  computed,
  Mixin
} = Ember;

const {
  hasMany
} = DS;

/**
  @class Assetable
  @module herd-ember/mixins/assetable
  @extends Ember.Mixin
*/
export default Mixin.create({
  assetableSlug: false,

  assets: hasMany('herd-asset', { async: false }),
  missingAssets: hasMany('herd-asset', { async: false }),

  hasAssets: computed('assets.length', function() {
    return get(this, 'assets.length') > 0;
  }),

  hasMissingAssets: computed('missingAssets.length', function() {
    return get(this, 'missingAssets.length') > 0;
  }),

  //TODO: Make this Transform aware
  assetForTransform() {
    if (get(this, 'hasAssets')) {
      return get(this, 'assets.firstObject');
    } else if (get(this, 'hasMissingAssets')) {
      return get(this, 'missingAssets.firstObject');
    } else {
      return null;
    }
  }
});
