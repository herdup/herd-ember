import Ember from 'ember';
import DS from 'ember-data';

const {
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
  assets: hasMany('herd-asset', { async: false })
});
