import Ember from 'ember';
import DS from 'ember-data';

const {
  attr,
  Model
} = DS;

const {
  get,
  computed 
} = Ember;

const pattern = new RegExp('^(?:[a-z]+:)?//', 'i');

/**
  @class HerdAsset
  @module herd-ember/models/herd-asset
  @extends DS.Model
*/
export default Model.extend({
  url: attr('string'),
  fileName:      attr('string'),
  transformName: attr('string'),
  assetClass: attr('string'),

  absoluteUrl: computed('url', function() {
    let url = get(this, 'url');
    if (pattern.test(url)) {
      return url;
    } else {
      return `${get(this, 'store').adapterFor('herd-asset').host}${url}`;
    }
  })
});
