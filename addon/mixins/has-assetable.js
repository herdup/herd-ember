import Ember from 'ember';

const {
  get,
  Mixin
} = Ember;

/**
  @class HasAssetable
  @module herd-ember/mixins/has-assetable
  @extends Ember.Mixin
*/
export default Mixin.create({
  resolveAssetableThen(callback) {
    let assetable = get(this, 'assetable');
    if (!assetable) { throw new Error('Herd Ember: Assetable is Undefined.'); }

    if (typeof assetable.then === 'function') {
      return assetable.then(resolvedAssetable => { return callback(resolvedAssetable); });
    } else {
      return callback(assetable);
    }
  }
});
